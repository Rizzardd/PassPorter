import { EventItem, TicketItem } from '@/core/events/types'
import { getClient, getCollection, getDb } from '@/lib/mongodb'
import { toPlainObject } from '@/lib/utils'
import { ObjectId } from 'mongodb'

export type WithEvent<T> = T & { event: EventItem }

export class EventRepository {
  async getTicketById(ticketId: string): Promise<WithEvent<TicketItem> | null> {
    const colTickets = await getCollection<WithEvent<TicketItem>>('tickets')

    const ticket = await colTickets.findOne({
      _id: new ObjectId(ticketId),
    })

    if (ticket) {
      ticket._id = ticket._id.toString()
      const event = await this.getById(ticket.eventId)
      ticket.event = event!
    }

    return ticket
  }

  async getTicketsByUserId(userId: string): Promise<WithEvent<TicketItem>[]> {
    const colTickets = await getCollection<WithEvent<TicketItem>>('tickets')
    const colEvts = await getCollection<EventItem>('events')

    const tickets = await colTickets.find({ userId }).toArray()

    const allTicketys = tickets.map((ticket) => {
      ticket._id = ticket._id.toString()
      return ticket
    })

    const relatedEvents = await colEvts
      .find({
        _id: { $in: allTicketys.map((t) => new ObjectId(t.eventId)) },
      })
      .toArray()
    console.log({ relatedEvents })
    const events = relatedEvents.map((event) => {
      event._id = event._id.toString()
      return event
    })

    const ticketsWithEvent = allTicketys
      .map((ticket) => {
        const event = events.find(
          (e) => e._id.toString() === ticket.eventId.toString()
        )
        return { ...ticket, event: event! }
      })
      .filter((x) => x.event)

    return toPlainObject(ticketsWithEvent)
  }

  async bookEvent(
    eventId: string,
    userId: string
  ): Promise<{
    success: boolean
    error: string | null
    ticketId: string
  }> {
    try {
      const client = await getClient()

      const session = client.startSession()
      session.startTransaction()
      const colEvts = await getCollection<EventItem>('events')
      const colTickets = await getCollection<Omit<TicketItem, '_id'>>('tickets')

      await colEvts.updateOne(
        {
          _id: new ObjectId(eventId),
        },
        {
          $inc: {
            numberOfTickets: -1,
          },
        },
        {
          session,
        }
      )

      const result = await colTickets.insertOne(
        {
          eventId: eventId,
          userId: userId,
        },
        { session }
      )

      await session.commitTransaction()

      return {
        ticketId: result.insertedId.toString(),
        success: true,
        error: null,
      }
    } catch (e) {
      return {
        success: false,
        error: 'Não foi possivel reservar',
        ticketId: '',
      }
    }
  }
  async getHighlights() {
    const col = await getCollection<EventItem>('events')
    const events = await col.find({}, { limit: 20 }).toArray()

    return toPlainObject(events)
  }

  async filter(name: string, locale: string, category: string) {
    const col = await getCollection<EventItem>('events')

    let filters: any[] = []

    if (locale) {
      filters.push({
        ['$or']: [
          { 'address.city': { $regex: new RegExp(locale, 'i') } },
          { 'address.state': { $regex: new RegExp(locale, 'i') } },
        ],
      })
    }
    if (name) {
      filters.push({
        name: { $regex: new RegExp(name, 'i') },
      })
    }
    if (category) {
      filters.push({
        category,
      })
    }
    const filter = filters.length > 1 ? { $and: filters } : filters[0]

    console.log(filter, category)

    if (filters.length === 0) {
      const events = await col.find().toArray()

      return toPlainObject(events)
    }

    const events = await col.find(filter).toArray()

    return toPlainObject(events)
  }

  async getById(eventId: string): Promise<EventItem | null> {
    if (!eventId) return null

    const col = await getCollection<EventItem>('events')

    const event = await col.findOne({
      _id: new ObjectId(eventId),
    })

    if (event) {
      event._id = event._id.toString()
    }
    return event
  }

  async saveEvent({ _id, ...event }: EventItem) {
    const col = await getCollection<EventItem>('events')

    const result = await col.insertOne(event as EventItem)

    const eventItem = {
      ...event,
      _id: result.insertedId,
    }

    return eventItem
  }
}

import { EventItem } from '@/core/events/types'
import { getCollection } from '@/lib/mongodb'
import { toPlainObject } from '@/lib/utils'
import { ObjectId } from 'mongodb'

export class EventRepository {
  async getHighlights() {
    const col = await getCollection<EventItem>('events')
    const events = await col.find({}, { limit: 20 }).toArray()

    return toPlainObject(events)
  }

  async getById(eventId: string): Promise<EventItem | null> {
    if (!eventId) return null

    const col = await getCollection<EventItem>('events')

    const event = await col.findOne({
      _id: new ObjectId(eventId),
      active: true,
    })

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

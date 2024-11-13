import { NextApiRequest, NextApiResponse } from 'next'
import { EventCardItem, EventItem } from '@/core/events/types'
import clientPromise from '@/lib/mongodb'
import { ObjectId } from 'mongodb'

export default async function getEventById(
  req: NextApiRequest,
  res: NextApiResponse<EventItem | { message: string }>
) {
  const { id } = req.query

  if (!id || typeof id !== 'string') {
    return res.status(400).json({ message: 'Event ID is required' })
  }

  try {
    const client = await clientPromise
    const db = client.db('passporter-test')
    const event = await db
      .collection<EventItem>('events')
      .findOne({ _id: new ObjectId(id) })

    if (!event) {
      return res.status(404).json({ message: 'Event not found' })
    }

    res.status(200).json(event)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Failed to fetch event' })
  }
}

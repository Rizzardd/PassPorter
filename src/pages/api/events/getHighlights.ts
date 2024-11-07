import { NextApiRequest, NextApiResponse } from 'next'
import { EventCardItem } from '@/core/events/types'
import clientPromise from '@/lib/mongodb'

export default async function getHighlightEvents(
  req: NextApiRequest,
  res: NextApiResponse<EventCardItem[] | { message: string }>
) {
  try {
    const client = await clientPromise
    const db = client.db('passporter-test')
    const data = await db.collection<EventCardItem>('events').find().toArray()

    res.status(200).json(data)
  } catch (e) {
    console.error(e)
    res.status(500).json({ message: 'Failed to fetch data' })
  }
}

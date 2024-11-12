import { ObjectId } from 'mongodb'

export interface EventCardItem {
  _id: ObjectId
  date: Date
  name: string
  image: string
}

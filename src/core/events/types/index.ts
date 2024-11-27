import { ObjectId } from 'mongodb'

export interface EventCardItem {
  _id: ObjectId | string
  date: Date
  name: string
  image: string
}

export interface EventItem {
  _id: ObjectId | string
  date: Date | string
  name: string
  image: string
  description: string
  location: {
    address: string
    district: string
    number: number
    city: string
    state: string
    venue?: string
    complement?: string
  }
}

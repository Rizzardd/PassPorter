import { ObjectId } from 'mongodb'

export interface EventCardItem {
  _id: ObjectId | string
  date: Date
  name: string
  imageUrl: string
}

export interface Address {
  street: string
  complement: string
  neighborhood: string
  number: string
  zipCode: string
  state: string
  city: string
}

export interface EventItem {
  _id: ObjectId | string
  address: Address
  duration: string
  time: string
  numberOfTickets: number
  date: string | Date
  category: string
  name: string
  description: string
  imageUrl?: string
  userId: string
}

export interface TicketItem {
  _id: ObjectId | string
  eventId: string
  userId: string
}

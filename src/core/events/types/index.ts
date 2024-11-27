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
  date: string | Date
  category: string
  name: string
  description: string
  imageUrl?: string // Descomente esta linha e ajuste o tipo se quiser incluir imagens/arquivos.
}

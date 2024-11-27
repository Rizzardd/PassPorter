'use server'

import { getCollection } from '@/lib/mongodb'
import { ObjectId } from 'mongodb'
import { User, UserLogin } from '../types'

export class UserRepository {
  async getUser(userId: string) {
    const users = await getCollection<UserLogin & User>('users')

    const user = await users.findOne({ _id: new ObjectId(userId) })

    return {
      id: user?._id?.toString(),
      email: user?.email,
      username: user?.username,
      name: user?.name,
      surname: user?.surname,
    }
  }
}

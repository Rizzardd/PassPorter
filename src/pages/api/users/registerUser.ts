// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import clientPromise from '@/lib/mongodb'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' })
  }

  try {
    const {
      name,
      surname,
      email,
      username,
      birthDate,
      password,
      phone: { areacode, number },
    } = req.body

    const client = await clientPromise
    const db = client.db('passporter-test')

    const existingUser = await db.collection('users').findOne({
      $or: [{ email }, { username }],
    })

    if (existingUser) {
      return res
        .status(409)
        .json({ message: 'Email or username already exists' })
    }

    const passwordHash = await bcrypt.hash(password, 10)

    const newUser = {
      name,
      surname,
      email,
      username,
      birthDate,
      password: passwordHash,
      phone: {
        areacode,
        number,
      },
      createdAt: new Date(),
    }

    await db.collection('users').insertOne(newUser)

    return res.status(201).json({ message: 'User registered successfully' })
  } catch (error: any) {
    if (error.name === 'ValidationError') {
      return res
        .status(400)
        .json({ message: 'Validation error', errors: error.errors })
    }
    console.error(error)
    return res.status(500).json({ message: 'Internal server error' })
  }
}

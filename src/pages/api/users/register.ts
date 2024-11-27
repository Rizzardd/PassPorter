// pages/api/register.ts
import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import clientPromise from '@/lib/mongodb'
import { Routing } from '@/core/routing/api-routing'

export default Routing()
  .post(async (req, res) => {
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
  })
  .build()

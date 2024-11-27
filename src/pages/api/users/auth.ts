import { NextApiRequest, NextApiResponse } from 'next'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import clientPromise from '@/lib/mongodb'
import { UserLogin } from '@/core/users/types'
import { Routing } from '@/core/routing/api-routing'
import { setCookie } from 'cookies-next'
import { UserInfo } from '@/core/auth/userinfo'
const JWT_SECRET = process.env.JWT_SECRET as string
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN
const JWT_OPTIONS = { expiresIn: JWT_EXPIRES_IN }
const JWT_COOKIE_NAME = 'jwt:access_token'

export default Routing()
  .post(async (req, res) => {
    const { login, password } = req.body

    if (!login || !password) {
      return res
        .status(400)
        .json({ message: 'Email and password are required' })
    }

    const client = await clientPromise
    const db = client.db('passporter-test')
    const user = await db
      .collection<UserLogin>('users')
      .findOne({ $or: [{ username: login }, { email: login }] })

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password)
    if (!isPasswordCorrect) {
      return res.status(401).json({ message: 'Invalid email or password' })
    }

    const userInfo: UserInfo = {
      userId: user._id?.toString(),
      email: user.email,
      username: user.username,
    }

    const token = jwt.sign(userInfo, JWT_SECRET, JWT_OPTIONS)

    await setCookie(JWT_COOKIE_NAME, token, {
      req,
      res,
      maxAge: 60 * 60 * 24 * 7,
    })

    return res.status(200).json({})
  })
  .build()

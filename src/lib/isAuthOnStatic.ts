import { getCookie, NextContext, OptionsType } from 'cookies-next'
import { IncomingMessage, OutgoingMessage } from 'http'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET as string

export async function isAuthOnStatic(opts: OptionsType): Promise<boolean> {
  const token = await getCookie('jwt:access_token', opts)
  if (!token) {
    return false
  }

  const isValid = jwt.verify(token, JWT_SECRET)

  if (!isValid) {
    return false
  }

  return true
}

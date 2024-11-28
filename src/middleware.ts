import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { deleteCookie } from 'cookies-next'

export async function middleware(req: NextRequest) {
  if (req.nextUrl.pathname.startsWith('/auth/logout')) {
    const res = NextResponse.redirect(new URL('/auth/loggin_out', req.url))
    await deleteCookie('jwt:access_token', { req, res })
    await deleteCookie('jwt:access_token', { req, res })
    return res
  }

  if (req.nextUrl.pathname.startsWith('/auth/loggin_out')) {
    const res = NextResponse.redirect(new URL('/', req.url))
    await deleteCookie('jwt:access_token', { req, res })
    await deleteCookie('jwt:access_token', { req, res })
    return res
  }

  return NextResponse.redirect(new URL('/', req.url))
}

export const config = {
  matcher: ['/auth/logout', '/auth/loggin_out'],
}

import { getCookie } from 'cookies-next'
import { NextApiRequest, NextApiResponse } from 'next'
import { UserInfo } from '../auth/userinfo'
import jwt from 'jsonwebtoken'
const JWT_SECRET = process.env.JWT_SECRET as string

type Handler = (
  req: NextApiRequest,
  res: NextApiResponse
) => void | Promise<void>

type AuthHandler = (
  req: NextApiRequest,
  res: NextApiResponse,
  userInfo: UserInfo
) => void | Promise<void>

type Routing = {
  get: (handler: Handler) => Routing
  post: (handler: Handler) => Routing
  put: (handler: Handler) => Routing
  delete: (handler: Handler) => Routing

  authGet: (handler: AuthHandler) => Routing
  authPost: (handler: AuthHandler) => Routing
  authPut: (handler: AuthHandler) => Routing
  authDelete: (handler: AuthHandler) => Routing

  build: () => (
    req: NextApiRequest,
    res: NextApiResponse
  ) => void | Promise<void>
}

function hofAuth(handler: AuthHandler): Handler {
  return async function (req, res) {
    const token = await getCookie('jwt:access_token', { req, res })
    if (!token) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const isValid = jwt.verify(token, JWT_SECRET)

    if (!isValid) {
      res.status(401).json({ message: 'Unauthorized' })
      return
    }

    const userInfo = jwt.decode(token) as UserInfo

    return handler(req, res, userInfo)
  }
}

export function Routing(): Routing {
  let getHandler: Handler | null = null
  let postHandler: Handler | null = null
  let putHandler: Handler | null = null
  let deleteHandler: Handler | null = null

  const routing: Routing = {
    get(handler: Handler) {
      getHandler = handler
      return routing
    },
    post(handler: Handler) {
      postHandler = handler
      return routing
    },
    put(handler: Handler) {
      putHandler = handler
      return routing
    },
    delete(handler: Handler) {
      deleteHandler = handler
      return routing
    },

    authGet(handler: AuthHandler) {
      return routing
    },
    authPost(handler: AuthHandler) {
      postHandler = hofAuth(handler)
      console.log({ postHandler })
      return routing
    },
    authPut(handler: AuthHandler) {
      putHandler = hofAuth(handler)
      return routing
    },
    authDelete(handler: AuthHandler) {
      deleteHandler = hofAuth(handler)
      return routing
    },

    build() {
      return async function (req: NextApiRequest, res: NextApiResponse) {
        try {
          if (req.method === 'GET' && getHandler) {
            await getHandler(req, res)
          } else if (req.method === 'POST' && postHandler) {
            await postHandler(req, res)
          } else if (req.method === 'PUT' && putHandler) {
            await putHandler(req, res)
          } else if (req.method === 'DELETE' && deleteHandler) {
            await deleteHandler(req, res)
          } else {
            res.status(405).end()
          }
        } catch (error: any) {
          if (error?.name === 'ValidationError') {
            return res
              .status(400)
              .json({ message: 'Validation error', errors: error.errors })
          }
          console.error(error)
          return res.status(500).json({ message: 'Internal server error' })
        }
      }
    },
  }

  return routing
}

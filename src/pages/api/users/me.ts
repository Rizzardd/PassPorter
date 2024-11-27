import { Routing } from '@/core/routing/api-routing'
import { UserRepository } from '@/core/users/repositories/user.repository'

export default Routing()
  .authGet(async (req, res, userInfo) => {
    const user = await new UserRepository().getUser(userInfo.userId)

    res.send(user)
  })
  .build()

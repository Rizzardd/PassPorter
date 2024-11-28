import { Routing } from '@/core/routing/api-routing'
import { EventRepository } from '@/core/users/repositories/event.repository'

export default Routing()
  .authPost(async (req, res, userInfo) => {
    const eventId = req.body.eventId

    const repository = new EventRepository()

    const { success, error, ticketId } = await repository.bookEvent(
      eventId,
      userInfo.userId
    )

    res.send({ ticketId, success, message: error })
  })
  .build()

import { Routing } from '@/core/routing/api-routing'
import { EventRepository } from '@/core/users/repositories/event.repository'

export default Routing()
  .get(async (req, res) => {
    const eventId = req.query.eventId as string

    const repository = new EventRepository()

    const event = await repository.getById(eventId)
    if (!event) {
      res.status(404).send({ message: 'Event not found' })
      return
    }

    res.send(event)
  })
  .build()

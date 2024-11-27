import { Routing } from '@/core/routing/api-routing'
import { EventRepository } from '@/core/users/repositories/event.repository'

export default Routing()
  .get((req, res) => {
    const repository = new EventRepository()
    const events = repository.getHighlights()

    res.send(events)
  })
  .build()

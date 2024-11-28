import { EventItem } from '@/core/events/types'
import { Routing } from '@/core/routing/api-routing'
import { EventRepository } from '@/core/users/repositories/event.repository'
import { getCollection } from '@/lib/mongodb'
import dayjs from 'dayjs'
import { IncomingForm } from 'formidable'
import { put } from '@vercel/blob'
import { randomUUID } from 'crypto'
import PersistentFile from 'formidable/PersistentFile'
import { readFile } from 'fs/promises'

export const config = {
  api: {
    bodyParser: false,
  },
}
export default Routing()
  .get(async (req, res) => {
    const { name, locale, category } = req.query

    const repository = new EventRepository()
    const events = await repository.filter(
      name as string,
      locale as string,
      category as string
    )

    res.send(events)
  })
  .authPost(async (req, res, userInfo) => {
    const form = new IncomingForm()
    const [fields, files] = await form.parse(req)

    let imageUrl = ''

    if ('banner' in files) {
      const f = files['banner']?.[0]!
      const file = await readFile(f.filepath)

      const result = await put(`events/banner/${randomUUID()}`, file, {
        access: 'public',
      })

      imageUrl = result.url
    }

    const data: EventItem = {
      _id: '',
      address: {
        street: fields['address[street]']?.[0] || '',
        complement: fields['address[complement]']?.[0] || '',
        neighborhood: fields['address[neighborhood]']?.[0] || '',
        number: fields['address[number]']?.[0] || '',
        zipCode: fields['address[zipCode]']?.[0] || '',
        state: fields['address[state]']?.[0] || '',
        city: fields['address[city]']?.[0] || '',
      },
      numberOfTickets: Number(fields['numberOfTickets']?.[0] || 1) || 1,
      duration: fields['duration']?.[0] || '',
      time: fields['time']?.[0] || '',
      date: fields['date']?.[0] || '',
      category: fields['category']?.[0] || '',
      name: fields['name']?.[0] || '',
      description: fields['description']?.[0] || '',
      imageUrl,
      userId: userInfo.userId,
    }

    const repository = new EventRepository()
    const event = await repository.saveEvent(data)
    res.send(event)
  })
  .build()

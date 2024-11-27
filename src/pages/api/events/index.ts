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
  .authPost(async (req, res, userInfo) => {
    const form = new IncomingForm()
    const [fields, files] = await form.parse(req)

    let imageUrl = ''

    if ('image' in files) {
      const f = files['image']?.[0]!
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
      duration: fields['duration']?.[0] || '',
      time: fields['time']?.[0] || '',
      date: fields['date']?.[0] || '',
      category: fields['category']?.[0] || '',
      name: fields['name']?.[0] || '',
      description: fields['description']?.[0] || '',
      imageUrl,
    }

    const repository = new EventRepository()
    repository.saveEvent(data)
  })
  .build()

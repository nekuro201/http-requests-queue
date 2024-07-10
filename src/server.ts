import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import { queueSayHello } from './lib/queue'
import {
  registrationSayHello,
  RegistrationSayHelloData,
} from './jobs/registrationSayHello'

import { createBullBoard } from '@bull-board/api'
import { BullAdapter } from '@bull-board/api/bullAdapter'
import { ExpressAdapter } from '@bull-board/express'

const serverAdapter = new ExpressAdapter()
serverAdapter.setBasePath('/admin/queues')

createBullBoard({
  queues: [new BullAdapter(queueSayHello)],
  serverAdapter,
})

const app = express()

app.use(cors())
app.use(express.json())

app.get('/', (req, res) => {
  return res.writeHead(201).end()
})
app.get('/say-hello', (req, res) => {
  const data = {
    id: '402',
    text: 'manual-hello',
  } as RegistrationSayHelloData

  queueSayHello.add(data, registrationSayHello.options)

  return res.writeHead(201).end()
})
app.post('/say-hello', (req, res) => {
  const id = req.body.id
  const text = req.body.text

  const data = {
    id,
    text,
  } as RegistrationSayHelloData

  queueSayHello.add(data, registrationSayHello.options)

  return res.writeHead(201).end()
})
app.use('/admin/queues', serverAdapter.getRouter())

app.listen(3334)

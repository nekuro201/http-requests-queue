import 'dotenv/config'
import Queue, { QueueOptions } from 'bull'
import redisConfig from '../config/redis'
import { registrationSayHello } from '../jobs/registrationSayHello'

const queueSayHello = new Queue(registrationSayHello.key, {
  redis: redisConfig,
} as QueueOptions)

export { queueSayHello }

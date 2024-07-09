import 'dotenv/config'
import Queue, { QueueOptions } from 'bull'
import redisConfig from '../config/redis'
import { registrationSayHello } from '../jobs/registrationSayHello'

const queueSayHello = new Queue(registrationSayHello.key, {
  redis: redisConfig,
} as QueueOptions)

export { queueSayHello }

// export default {
//   queues,
//   add<T extends JobKeys>(name: T, data: DataType<T>) {
//     const queue = this.queues.find((queue) => queue.name === name)
//     return queue?.bull.add(data, queue.options)
//   },
//   process() {
//     return this.queues.forEach((queue) => {
//       queue.bull.process(queue.handle)

//       queue.bull.on('failed', (job, err) => {
//         if (job.attemptsMade >= 5) {
//           queue.bull.pause()
//         }
//         console.log('Job failed', queue.name, job.data)
//         console.log(err)
//       })
//     })
//   },
// }

// const messageQueue = new Queue(registrationMessage.key, {
//   redis: redisConfig,
// } as QueueOptions)

// messageQueue.on('failed', (job, err) => {
//   console.log('Job failed', job.name, job.data)
//   console.log(err)
// })

// export { messageQueue }

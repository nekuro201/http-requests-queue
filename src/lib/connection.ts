import { Job } from 'bull'

export function connect(job: Job): Promise<void> {
  return new Promise((resolve) => {
    console.log('connection try again...')
    setTimeout(() => {
      console.log('reconnected!')
      job.queue.resume()
      resolve()
    }, 10_000)
  })
}

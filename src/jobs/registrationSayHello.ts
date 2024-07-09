import { DoneCallback, Job, JobOptions } from 'bull'

export interface RegistrationSayHelloData {
  id: string
  text: string
}

export const registrationSayHello = {
  key: 'registrationSayHello',
  options: {
    backoff: 5000,
    delay: 1000,
    attempts: 2,
  } as JobOptions,
  async handle(job: Job<RegistrationSayHelloData>, done: DoneCallback) {
    try {
      const { id, text } = job.data

      console.log(id, text)

      done()

      if (text === 'palavrao') {
        done(new Error('error transcoding'))
      }
    } catch (error) {
      done(new Error('error transcoding'))
    }
  },
}

import { DoneCallback, Job, JobOptions } from 'bull'
import { ConnetionError, ProfanityError, UnknownError } from '../lib/erros'
import { connect } from '../lib/connection'

export interface RegistrationSayHelloData {
  id: string
  text: string
}

function sayHello(id: string, text: string): Promise<void> {
  return new Promise((resolve, reject) => {
    try {
      setTimeout(() => {
        if (text === 'palavrao') {
          reject(new ProfanityError('Profanity detected in the text'))
        }

        if (text === 'connection-down') {
          reject(new ConnetionError('Connection is currently unavailable'))
        }

        console.log(id)
        resolve()
      }, 2000)
    } catch (error) {
      reject(new UnknownError('An unknown error occurred'))
    }
  })
}

export const registrationSayHello = {
  key: 'registrationSayHello',
  options: {
    backoff: 2000,
    delay: 100,
    attempts: 2,
  } as JobOptions,
  handle(job: Job<RegistrationSayHelloData>, done: DoneCallback) {
    try {
      const { id, text } = job.data

      job.progress(42)

      sayHello(id, text)
        .then(() => {
          job.progress(100)
          done()
        })
        .catch((error) => {
          if (error instanceof ConnetionError) {
            job.update({ id, text: 'try again connection-down' })
            job.queue.pause()
            connect(job)
          } else if (error instanceof ProfanityError) {
            console.log('finded bad word :/')
          }
          done(new Error(error.message))
        })
    } catch (error) {
      done(new Error('error transcoding'))
    }
  },
}

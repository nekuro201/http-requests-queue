import { queueSayHello } from './lib/queue'
import { registrationSayHello } from './jobs/registrationSayHello'

queueSayHello.process(registrationSayHello.handle)

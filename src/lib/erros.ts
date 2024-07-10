export class UnknownError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'UnknownError'
  }
}

export class ConnetionError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ConnetionError'
  }
}

export class ProfanityError extends Error {
  constructor(message: string) {
    super(message)
    this.name = 'ProfanityError'
  }
}

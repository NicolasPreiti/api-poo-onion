export class BaseError extends Error {
  public status: number

  constructor (status: number, name: string, message: string) {
    super(message)
    this.name = name
    this.status = status
  }
}

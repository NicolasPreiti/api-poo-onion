import { IHttpResponse } from '../interfaces'

export abstract class BaseMiddleware {
  protected readonly response: IHttpResponse

  constructor (response: IHttpResponse) {
    this.response = response
  }
}

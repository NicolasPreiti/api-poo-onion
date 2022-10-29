import { IHttpResponse } from '../interfaces/http.interface'

export abstract class BaseController<UseCase> {
  protected readonly useCase: UseCase
  protected readonly response: IHttpResponse

  constructor (useCase: UseCase, response: IHttpResponse) {
    this.useCase = useCase
    this.response = response
  }
}

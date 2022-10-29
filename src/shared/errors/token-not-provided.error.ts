import { BaseError } from '../base/base.error'

export class TokenNotProvidedError extends BaseError {
  constructor () {
    super(400, 'TokenNotProvidedError', 'token not provided')
  }
}

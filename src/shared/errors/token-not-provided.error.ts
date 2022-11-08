import { BaseError } from '../base/base.error'

export class TokenNotProvidedError extends BaseError {
  constructor () {
    super(401, 'TokenNotProvidedError', 'token not provided')
  }
}

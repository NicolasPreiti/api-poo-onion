import { BaseError } from '../base/base.error'

export class InvalidTokenError extends BaseError {
  constructor () {
    super(400, 'InvalidTokenError', 'invalid token')
  }
}

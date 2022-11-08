import { BaseError } from '../base/base.error'

export class InvalidTokenError extends BaseError {
  constructor () {
    super(401, 'InvalidTokenError', 'invalid token')
  }
}

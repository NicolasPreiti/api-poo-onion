import { BaseError } from '../../../shared/base/base.error'

export class UserNotFoundError extends BaseError {
  constructor () {
    super(404, 'UserNotFoundError', 'user not found')
  }
}

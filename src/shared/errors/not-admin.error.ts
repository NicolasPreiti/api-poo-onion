import { BaseError } from '../base/base.error'

export class NotAdminError extends BaseError {
  constructor () {
    super(403, 'NotAdminError', "you don't have permissions")
  }
}

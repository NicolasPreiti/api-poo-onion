import { BaseError } from '../../../shared/base/base.error'

export class EmailInUseError extends BaseError {
  constructor () {
    super(400, 'EmailInUseError', 'email provided is already in use')
  }
}

import { BaseError } from '../../../shared/base/base.error'

export class EmailOrPasswordIncorrectError extends BaseError {
  constructor () {
    super(400, 'EmailOrPasswordIncorrectError', 'email or password are incorrect')
  }
}

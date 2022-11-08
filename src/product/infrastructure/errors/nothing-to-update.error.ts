import { BaseError } from '../../../shared/base/base.error'

export class NothingToUpdateError extends BaseError {
  constructor () {
    super(400, 'NothingToUpdateError', 'nothing to update, empty body or invalid props')
  }
}

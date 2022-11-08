import { BaseError } from '../../../shared/base/base.error'

export class ProductNotFoundError extends BaseError {
  constructor () {
    super(404, 'ProductNotFoundError', 'product not found')
  }
}

import { NextFunction, Request, Response } from 'express'
import { BaseMiddleware } from '../../../shared/base/base.middleware'
import { IHttpResponse, TypedResponse } from '../../../shared/interfaces'
import { ProductEntityNotRelations } from '../../domain/product.entity'
import { NothingToUpdateError } from '../errors/nothing-to-update.error'

export class UpdateProductMiddleware extends BaseMiddleware {
  constructor (response: IHttpResponse) {
    super(response)
  }

  public notEmptyBody = async (req: Request, res: Response, next: NextFunction): Promise<TypedResponse | any> => {
    try {
      const product: ProductEntityNotRelations = {
        name: '',
        description: '',
        price: 0,
        stock: 0
      }
      const entityKeys = Object.keys(product)
      const bodyKeys = Object.keys(req.body)

      if (bodyKeys.length === 0) throw new NothingToUpdateError()

      let match = false
      for (const bodyKey of bodyKeys) {
        if (match) break

        for (const entityKey of entityKeys) {
          if (bodyKey === entityKey) {
            match = true
            next()
            break
          }
        }
      }
      if (!match) throw new NothingToUpdateError()
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }
}

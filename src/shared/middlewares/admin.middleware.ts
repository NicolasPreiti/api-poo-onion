import { NextFunction, Response } from 'express'
import { BaseMiddleware } from '../base/base.middleware'
import { NotAdminError } from '../errors/not-admin.error'
import { IHttpResponse, TokenRequest, TypedResponse } from '../interfaces'

export class AdminMiddleware extends BaseMiddleware {
  constructor (response: IHttpResponse) {
    super(response)
  }

  public isAdmin = (req: TokenRequest, res: Response, next: NextFunction): TypedResponse => {
    try {
      const { user: { roleId } } = req.token

      if (Number(roleId) !== 1) throw new NotAdminError()
      return next() as any
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }
}

import { NextFunction, Response } from 'express'
import { Jwt } from '../../user/infrastructure/utils'
import { BaseMiddleware } from '../base/base.middleware'
import { TokenNotProvidedError } from '../errors/token-not-provided.error'
import { IAuthentication, IHttpResponse, TokenRequest, TypedResponse } from '../interfaces'

export class AuthMiddleware extends BaseMiddleware {
  private readonly authentication: IAuthentication

  constructor (response: IHttpResponse) {
    super(response)
    this.authentication = new Jwt()
  }

  public validate = (req: TokenRequest, res: Response, next: NextFunction): TypedResponse => {
    try {
      const token = req.headers.authorization?.split(' ')[1]
      if (token === undefined) throw new TokenNotProvidedError()

      const tokenPayload = this.authentication.decodeToken(token)
      req.token = tokenPayload

      return next() as any
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }
}

import { NextFunction, Request, Response } from 'express'
import { BaseMiddleware } from '../../../shared/base/base.middleware'
import { IHttpResponse, TypedResponse } from '../../../shared/interfaces'
import { UserEntity } from '../../domain/user.entity'
import { IUserRepository } from '../../domain/user.repository'
import { EmailInUseError } from '../errors/email-in-use.error'

export class EmailValidator extends BaseMiddleware {
  private readonly repository: IUserRepository

  constructor (response: IHttpResponse, repository: IUserRepository) {
    super(response)
    this.repository = repository
  }

  public validate = async (req: Request, res: Response, next: NextFunction): Promise<TypedResponse> => {
    try {
      const { email }: UserEntity = req.body
      if (email === undefined) return next() as any
      const user = await this.repository.findByEmail(email)

      if (user !== null) throw new EmailInUseError()
      return next() as any
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }
}

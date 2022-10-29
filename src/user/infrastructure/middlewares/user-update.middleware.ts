import { NextFunction, Request } from 'express'
import { BaseMiddleware } from '../../../shared/base/base.middleware'
import { IHttpResponse, TypedResponse } from '../../../shared/interfaces'
import { DtoValidator } from '../../../shared/utils/validator.util'
import { UserEntity, UserEntityNotRelations } from '../../domain/user.entity'
import { UserUpdateDTO } from '../dto/user-update.dto'
import { NothingToUpdateError } from '../errors/nothing-to-update.error'

export class UserUpdateValidator extends BaseMiddleware {
  private readonly validator: DtoValidator

  constructor (response: IHttpResponse) {
    super(response)
    this.validator = new DtoValidator(this.response)
  }

  public validate = async (req: Request, res: TypedResponse, next: NextFunction): Promise<void> => {
    const { email, password }: UserEntity = req.body
    const userDTO = new UserUpdateDTO()

    userDTO.email = email
    userDTO.password = password

    await this.validator.validate(res, next, userDTO)
  }

  public emptyBody = async (req: Request, res: TypedResponse, next: NextFunction): Promise<void> => {
    try {
      const user: UserEntityNotRelations = {
        email: '',
        password: ''
      }
      const userKeys = Object.keys(user)
      const bodyKeys = Object.keys(req.body)

      if (bodyKeys.length === 0) throw new NothingToUpdateError()

      let match = false
      for (const bodyKey of bodyKeys) {
        if (match) break

        for (const userKey of userKeys) {
          if (bodyKey === userKey) {
            match = true
            next()
            break
          }
        }
      }

      if (!match) throw new NothingToUpdateError()
    } catch (err: any) {
      this.response.sendError(res, err.status, err.message)
    }
  }
}

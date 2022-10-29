import { NextFunction, Request } from 'express'
import { BaseMiddleware } from '../../../shared/base/base.middleware'
import { IHttpResponse, TypedResponse } from '../../../shared/interfaces'
import { DtoValidator } from '../../../shared/utils/validator.util'
import { UserEntity } from '../../domain/user.entity'
import { UserCreateDTO } from '../dto/user-create.dto'

export class UserCreateValidator extends BaseMiddleware {
  private readonly validator: DtoValidator

  constructor (response: IHttpResponse) {
    super(response)
    this.validator = new DtoValidator(this.response)
  }

  public validate = async (req: Request, res: TypedResponse, next: NextFunction): Promise<void> => {
    const { email, password }: UserEntity = req.body
    const userDto = new UserCreateDTO()

    userDto.email = email
    userDto.password = password

    await this.validator.validate(res, next, userDto)
  }
}

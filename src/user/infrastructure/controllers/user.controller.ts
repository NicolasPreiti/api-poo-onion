import { Request, Response } from 'express'
import { BaseController } from '../../../shared/base/base.controller'
import { IAuthentication, IEncrypt, IUuid, TokenRequest, TypedResponse } from '../../../shared/interfaces'
import { Uuid } from '../../../shared/utils'
import { HttpResponse } from '../../../shared/utils/reponse.util'
import { UserEntity } from '../../domain/user.entity'
import { IUserUseCase } from '../../domain/user.use-case'
import { EmailOrPasswordIncorrectError } from '../errors/email-password-incorrect.error'
import { Bcrypt, Jwt } from '../utils'

export class UserController extends BaseController<IUserUseCase> {
  private readonly authentication: IAuthentication
  private readonly uuid: IUuid
  private readonly encrypt: IEncrypt

  constructor (useCase: IUserUseCase, response: HttpResponse) {
    super(useCase, response)
    this.authentication = new Jwt()
    this.uuid = new Uuid()
    this.encrypt = new Bcrypt(10)
  }

  public createUser = async (req: Request, res: Response): Promise<TypedResponse> => {
    try {
      const { email, password }: UserEntity = req.body
      const uuid = this.uuid.generate()
      const encryptedPassword = await this.encrypt.encrypt(password)

      const user = await this.useCase.createUser({
        uuid,
        email,
        password: encryptedPassword,
        roleId: 2
      })
      const token = this.authentication.generateToken({
        user: {
          uuid: user.uuid as string,
          roleId: user.roleId
        }
      })

      return this.response.send(res, 201, {
        user,
        token
      })
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }

  public loginUser = async (req: Request, res: Response): Promise<TypedResponse> => {
    try {
      const { email, password }: UserEntity = req.body
      const user = await this.useCase.findUserByEmail(email)

      if (user === null) throw new EmailOrPasswordIncorrectError()
      const passwordMatch = await this.encrypt.compareHash(password, user.password)
      if (!passwordMatch) throw new EmailOrPasswordIncorrectError()

      const token = this.authentication.generateToken({
        user: {
          uuid: user.uuid as string,
          roleId: user.roleId
        }
      })

      return this.response.send(res, 200, {
        user,
        token
      })
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }

  public updateUser = async (req: TokenRequest, res: Response): Promise<TypedResponse> => {
    try {
      const { user: { uuid } } = req.token
      const { email, password }: UserEntity = req.body

      const hashedPassword = password !== undefined
        ? await this.encrypt.encrypt(password)
        : undefined

      await this.useCase.updateUser(uuid, {
        email,
        password: hashedPassword
      })

      return this.response.send(res, 204, {
        message: 'user updated'
      })
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }

  public deleteUser = async (req: TokenRequest, res: Response): Promise<TypedResponse> => {
    try {
      const { user: { uuid } } = req.token
      await this.useCase.deleteUser(uuid)

      return this.response.send(res, 204)
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }
}

import { BaseRouter } from '../../../shared/base/base.router'
import { AuthMiddleware } from '../../../shared/middlewares/auth.middleware'
import { HttpResponse } from '../../../shared/utils/reponse.util'
import { UserUseCase } from '../../application/user.use-case'
import { IUserRepository } from '../../domain/user.repository'
import { IUserUseCase } from '../../domain/user.use-case'
import { UserController } from '../controllers/user.controller'
import { EmailValidator } from '../middlewares/email.middleware'
import { UserCreateValidator } from '../middlewares/user-create.middleware'
import { UserUpdateValidator } from '../middlewares/user-update.middleware'
import { MySqlRepository } from '../repository/user.mysql.repository'

export class UserRouter extends BaseRouter<UserController, IUserUseCase, IUserRepository> {
  private readonly createDto: UserCreateValidator
  private readonly emailValidator: EmailValidator
  private readonly auth: AuthMiddleware
  private readonly updateMiddleware: UserUpdateValidator

  constructor () {
    super()
    this.response = new HttpResponse()
    this.repository = new MySqlRepository()
    this.useCase = new UserUseCase(this.repository)
    this.controller = new UserController(this.useCase, this.response)

    this.createDto = new UserCreateValidator(this.response)
    this.emailValidator = new EmailValidator(this.response, this.repository)
    this.updateMiddleware = new UserUpdateValidator(this.response)
    this.auth = new AuthMiddleware(this.response)

    this.routes()
  }

  protected routes = (): void => {
    this._router.post(
      '/auth/signin',
      this.createDto.validate as any,
      this.emailValidator.validate as any,
      this.controller.createUser as any
    )

    this._router.post(
      '/auth/login',
      this.createDto.validate as any,
      this.controller.loginUser as any
    )

    this._router.patch(
      '/user',
      this.auth.validate as any,
      this.updateMiddleware.emptyBody as any,
      this.updateMiddleware.validate as any,
      this.emailValidator.validate as any,
      this.controller.updateUser as any
    )

    this._router.delete(
      '/user',
      this.auth.validate as any,
      this.controller.deleteUser as any
    )
  }
}

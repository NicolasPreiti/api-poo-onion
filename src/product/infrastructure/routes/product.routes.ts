import { BaseRouter } from '../../../shared/base/base.router'
import { AdminMiddleware, AuthMiddleware, DtoMiddleware } from '../../../shared/middlewares'
import { HttpResponse } from '../../../shared/utils'
import { ProductUseCase } from '../../application/product.use-case'
import { ProductRepository } from '../../domain/product.repository'
import { ProductController } from '../controllers/product.controller'
import { CreateProductDTO } from '../dto/create-product.dto'
import { UpdateProductDTO } from '../dto/update-product.dto'
import { UpdateProductMiddleware } from '../middlewares/update-product.middleware'
import { ProductModel } from '../models/product.model'
import { MySqlRepository } from '../repository/product.mysql.repository'

export class ProductRouter extends BaseRouter<ProductController, ProductUseCase, ProductRepository> {
  private readonly auth: AuthMiddleware
  private readonly admin: AdminMiddleware
  private readonly createDTO: CreateProductDTO
  private readonly updateDTO: UpdateProductDTO
  private readonly updateMiddleware: UpdateProductMiddleware

  constructor () {
    super()
    this.response = new HttpResponse()
    this.repository = new MySqlRepository(ProductModel)
    this.useCase = new ProductUseCase(this.repository)
    this.controller = new ProductController(this.useCase, this.response)
    this.validator = new DtoMiddleware(this.response)
    this.createDTO = new CreateProductDTO()

    this.auth = new AuthMiddleware(this.response)
    this.admin = new AdminMiddleware(this.response)
    this.updateMiddleware = new UpdateProductMiddleware(this.response)
    this.updateDTO = new UpdateProductDTO()

    this.routes()
  }

  public routes = (): void => {
    this._router.get(
      '/',
      this.controller.getAll as any
    )

    this._router.get(
      '/:uuid',
      this.controller.getOne as any
    )

    this._router.post(
      '/',
      this.auth.validate as any,
      this.admin.isAdmin as any,
      this.validator.validate(this.createDTO),
      this.controller.createProduct as any
    )

    this._router.patch(
      '/:uuid',
      this.auth.validate as any,
      this.admin.isAdmin as any,
      this.updateMiddleware.notEmptyBody as any,
      this.validator.validate(this.updateDTO),
      this.controller.update as any
    )

    this._router.delete(
      '/:uuid',
      this.auth.validate as any,
      this.admin.isAdmin as any,
      this.controller.delete as any
    )
  }
}

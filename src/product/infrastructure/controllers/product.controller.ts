import { Request } from 'express'
import { BaseController } from '../../../shared/base/base.controller'
import { IHttpResponse, IUuid, TypedResponse } from '../../../shared/interfaces'
import { Uuid } from '../../../shared/utils'
import { ProductUseCase } from '../../application/product.use-case'

export class ProductController extends BaseController<ProductUseCase> {
  private readonly uuid: IUuid

  constructor (useCase: ProductUseCase, response: IHttpResponse) {
    super(useCase, response)
    this.uuid = new Uuid()
  }

  public createProduct = async (req: Request, res: TypedResponse): Promise<TypedResponse> => {
    try {
      const uuid = this.uuid.generate()
      const product = await this.useCase.create({
        uuid,
        ...req.body
      })

      return this.response.send(res, 201, product)
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }

  public getOne = async (req: Request, res: TypedResponse): Promise<TypedResponse> => {
    try {
      const { uuid } = req.params
      const product = await this.useCase.findOneById(uuid)

      return this.response.send(res, 200, product)
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }

  public getAll = async (req: Request, res: TypedResponse): Promise<TypedResponse> => {
    try {
      const products = await this.useCase.findAll()

      return this.response.send(res, 200, products)
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }

  public update = async (req: Request, res: TypedResponse): Promise<TypedResponse> => {
    try {
      const { uuid } = req.params
      await this.useCase.update(uuid, req.body)

      return this.response.send(res, 204)
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }

  public delete = async (req: Request, res: TypedResponse): Promise<TypedResponse> => {
    try {
      const { uuid } = req.params
      await this.useCase.delete(uuid)

      return this.response.send(res, 204)
    } catch (err: any) {
      return this.response.sendError(res, err.status, err.message)
    }
  }
}

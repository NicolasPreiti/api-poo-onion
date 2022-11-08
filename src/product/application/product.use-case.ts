import { BaseUseCase } from '../../shared/base/base.use-case'
import { ProductEntity } from '../domain/product.entity'
import { ProductRepository } from '../domain/product.repository'

export class ProductUseCase extends BaseUseCase<ProductRepository> {
  constructor (repository: ProductRepository) {
    super(repository)
  }

  public create = async (model: ProductEntity): Promise<ProductEntity> => {
    const product = await this.repository.create(model)
    return product
  }

  public findOneById = async (uuid: string): Promise<ProductEntity> => {
    const product = await this.repository.findOneById(uuid)
    return product
  }

  public findAll = async (): Promise<ProductEntity[]> => {
    const products = await this.repository.findAll()
    return products
  }

  public update = async (uuid: string, model: Partial<ProductEntity>): Promise<void> => {
    const product = await this.repository.update(uuid, model)
    return product
  }

  public delete = async (uuid: string): Promise<void> => {
    const product = await this.repository.delete(uuid)
    return product
  }
}

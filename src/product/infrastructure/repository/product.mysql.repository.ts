import { BaseRepository } from '../../../shared/base/base.repository'
import { ProductEntity, ProductEntityNotId } from '../../domain/product.entity'
import { ProductRepository } from '../../domain/product.repository'
import { ProductNotFoundError } from '../errors/product-not-found.error'
import { ProductModel } from '../models/product.model'

export class MySqlRepository extends BaseRepository<typeof ProductModel> implements ProductRepository {
  public create = async (model: ProductEntity): Promise<ProductEntity> => {
    const { uuid, name, description, price, stock } = model

    const product = new this.Model()
    product.uuid = uuid
    product.name = name
    product.description = description
    product.price = price
    product.stock = stock

    await this.Model.save(product)
    return product
  }

  public findAll = async (): Promise<ProductEntity[]> => {
    const products = await this.Model.find({
      select: {
        uuid: true,
        name: true,
        description: true,
        price: true,
        stock: true
      }
    })

    return products
  }

  public findOneById = async (uuid: string): Promise<ProductEntity> => {
    const product = await this.Model.findOne({
      select: {
        uuid: true,
        name: true,
        description: true,
        price: true,
        stock: true
      },
      where: {
        uuid
      }
    })

    if (product === null) throw new ProductNotFoundError()

    return product
  }

  public update = async (uuid: string, model: Partial<ProductEntityNotId>): Promise<void> => {
    const product = await this.findOneById(uuid)
    const { name, description, price, stock } = model

    product.name = name as string
    product.description = description as string
    product.price = price as number
    product.stock = stock as number

    await this.Model.save(product as ProductModel)
  }

  public delete = async (uuid: string): Promise<void> => {
    const product = await this.findOneById(uuid)

    await this.Model.delete(product)
  }
}

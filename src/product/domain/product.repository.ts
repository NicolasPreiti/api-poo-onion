import { ProductEntity, ProductEntityNotId } from './product.entity'

export interface ProductRepository {
  create: (model: ProductEntity) => Promise<ProductEntity>
  findAll: () => Promise<ProductEntity[]>
  findOneById: (uuid: string) => Promise<ProductEntity>
  update: (uuid: string, model: Partial<ProductEntityNotId>) => Promise<void>
  delete: (uuid: string) => Promise<void>
}

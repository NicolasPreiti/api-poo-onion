export interface ProductEntity {
  uuid: string
  name: string
  description: string
  price: number
  stock: number
}

export type ProductEntityNotId = Omit<ProductEntity, 'uuid'>

export type ProductEntityNotRelations = Omit<ProductEntityNotId, ''>

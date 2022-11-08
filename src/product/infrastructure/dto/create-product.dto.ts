import { IsInt, IsNotEmpty, IsString } from 'class-validator'
import { Request } from 'express'
import { ProductEntityNotRelations } from '../../domain/product.entity'

export class CreateProductDTO implements ProductEntityNotRelations {
  @IsNotEmpty()
  @IsString()
    name!: string

  @IsNotEmpty()
  @IsString()
    description!: string

  @IsNotEmpty()
  @IsInt()
    price!: number

  @IsNotEmpty()
  @IsInt()
    stock!: number

  public create = (req: Request): CreateProductDTO => {
    const { name, description, price, stock }: ProductEntityNotRelations = req.body

    const product = new CreateProductDTO()
    product.name = name
    product.description = description
    product.price = price
    product.stock = stock

    return product
  }
}

import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator'
import { Request } from 'express'
import { ProductEntityNotRelations } from '../../domain/product.entity'

export class UpdateProductDTO implements ProductEntityNotRelations {
  @IsOptional()
  @IsNotEmpty()
  @IsString()
    name!: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
    description!: string

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
    price!: number

  @IsOptional()
  @IsNotEmpty()
  @IsInt()
    stock!: number

  public create = (req: Request): UpdateProductDTO => {
    const { name, description, price, stock }: ProductEntityNotRelations = req.body

    const product = new UpdateProductDTO()
    product.name = name
    product.description = description
    product.price = price
    product.stock = stock

    return product
  }
}

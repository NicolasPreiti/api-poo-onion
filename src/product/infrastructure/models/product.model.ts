import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { ProductEntity } from '../../domain/product.entity'

@Entity('product')
export class ProductModel extends BaseEntity implements ProductEntity {
  @PrimaryColumn({ type: 'varchar', nullable: false })
    uuid!: string

  @Column({ type: 'varchar', nullable: false })
    name!: string

  @Column({ type: 'varchar', nullable: false })
    description!: string

  @Column({ type: 'int', nullable: false })
    price!: number

  @Column({ type: 'int', nullable: false })
    stock!: number

  @CreateDateColumn()
    created_at!: Date

  @UpdateDateColumn()
    updated_at!: Date

  @DeleteDateColumn()
    deleted_at!: Date
}

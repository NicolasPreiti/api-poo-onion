import { BaseEntity, CreateDateColumn, DeleteDateColumn, PrimaryColumn, UpdateDateColumn } from 'typeorm'

export class BaseModel extends BaseEntity {
  @PrimaryColumn({ type: 'varchar', nullable: false })
    uuid!: string | number

  @CreateDateColumn()
    created_at!: Date

  @UpdateDateColumn()
    updated_at!: Date

  @DeleteDateColumn()
    deleted_at!: Date
}

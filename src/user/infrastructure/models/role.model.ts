import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { UserModel } from './user.model'

@Entity('role')
export class RoleModel extends BaseEntity {
  @PrimaryGeneratedColumn()
    uuid!: number

  @Column({ type: 'varchar', nullable: false })
    name!: string

  @OneToMany(() => UserModel, (user) => user.role)
    users!: UserModel[]

  @CreateDateColumn()
    created_at!: Date

  @UpdateDateColumn()
    updated_at!: Date

  @DeleteDateColumn()
    deleted_at!: Date
}

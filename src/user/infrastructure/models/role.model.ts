import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm'
import { BaseModel } from '../../../shared/base/base.model'
import { UserModel } from './user.model'

@Entity('role')
export class RoleModel extends BaseModel {
  @PrimaryGeneratedColumn()
    uuid!: number

  @Column({ type: 'varchar', nullable: false })
    name!: string

  @OneToMany(() => UserModel, (user) => user.role)
    users!: UserModel[]
}

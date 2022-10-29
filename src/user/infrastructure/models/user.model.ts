import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from 'typeorm'
import { BaseModel } from '../../../shared/base/base.model'
import { UserEntityNotRelations } from '../../domain/user.entity'
import { RoleModel } from './role.model'

@Entity('user')
export class UserModel extends BaseModel implements UserEntityNotRelations {
  @PrimaryColumn({ type: 'varchar', nullable: false })
    uuid!: string

  @Column({ type: 'varchar', nullable: false, unique: true })
    email!: string

  @Column({ type: 'varchar', nullable: false })
    password!: string

  @ManyToOne(() => RoleModel, (role) => role.uuid, { nullable: false })
  @JoinColumn({ name: 'role_id' })
    role!: RoleModel
}

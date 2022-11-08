import { BaseEntity, Column, CreateDateColumn, DeleteDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, UpdateDateColumn } from 'typeorm'
import { UserEntityNotRelations } from '../../domain/user.entity'
import { RoleModel } from './role.model'

@Entity('user')
export class UserModel extends BaseEntity implements UserEntityNotRelations {
  @PrimaryColumn({ type: 'varchar', nullable: false })
    uuid!: string

  @Column({ type: 'varchar', nullable: false, unique: true })
    email!: string

  @Column({ type: 'varchar', nullable: false })
    password!: string

  @ManyToOne(() => RoleModel, (role) => role.uuid, { nullable: false })
  @JoinColumn({ name: 'role_id' })
    role!: RoleModel

  @CreateDateColumn()
    created_at!: Date

  @UpdateDateColumn()
    updated_at!: Date

  @DeleteDateColumn()
    deleted_at!: Date
}

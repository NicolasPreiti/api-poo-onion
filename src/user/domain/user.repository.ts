import { UserEntity } from './user.entity'

export interface IUserRepository {
  create: (model: UserEntity) => Promise<UserEntity>
  findById: (uuid: string) => Promise<UserEntity>
  findByEmail: (email: string) => Promise<UserEntity | null>
  update: (uuid: string, model: Partial<UserEntity>) => Promise<void>
  delete: (uuid: string) => Promise<void>
}

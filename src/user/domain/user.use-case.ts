import { UserEntity } from './user.entity'

export interface IUserUseCase {
  createUser: (model: UserEntity) => Promise<UserEntity>
  findUserById: (uuid: string) => Promise<UserEntity>
  findUserByEmail: (email: string) => Promise<UserEntity | null>
  updateUser: (uuid: string, model: Partial<UserEntity>) => Promise<void>
  deleteUser: (uuid: string) => Promise<void>
}

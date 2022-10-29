import { BaseUseCase } from '../../shared/base/base.use-case'
import { UserEntity } from '../domain/user.entity'
import { IUserRepository } from '../domain/user.repository'
import { IUserUseCase } from '../domain/user.use-case'

export class UserUseCase extends BaseUseCase<IUserRepository> implements IUserUseCase {
  constructor (repository: IUserRepository) {
    super(repository)
  }

  public createUser = async (model: UserEntity): Promise<UserEntity> => {
    const user = await this.repository.create(model)
    return user
  }

  public findUserById = async (uuid: string): Promise<UserEntity> => {
    const user = await this.findUserById(uuid)
    return user
  }

  public findUserByEmail = async (email: string): Promise<UserEntity | null> => {
    const user = await this.repository.findByEmail(email)
    return user
  }

  public updateUser = async (uuid: string, model: Partial<UserEntity>): Promise<void> => {
    await this.repository.update(uuid, model)
  }

  public deleteUser = async (uuid: string): Promise<void> => {
    await this.repository.delete(uuid)
  }
}

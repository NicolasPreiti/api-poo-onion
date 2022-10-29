import { BaseRepository } from '../../../shared/base/base.repository'
import { UserEntity } from '../../domain/user.entity'
import { IUserRepository } from '../../domain/user.repository'
import { UserAdapter } from '../adapters/user.adapter'
import { UserNotFoundError } from '../errors/user-not-found.error'
import { RoleModel } from '../models/role.model'
import { UserModel } from '../models/user.model'

export class MySqlRepository extends BaseRepository<typeof UserModel> implements IUserRepository {
  private readonly adapter: UserAdapter

  constructor () {
    super(UserModel)
    this.adapter = new UserAdapter()
  }

  public create = async (model: UserEntity): Promise<UserEntity> => {
    const { uuid, email, password, roleId } = model
    let user = new this.Model()

    user.uuid = uuid as string
    user.email = email
    user.password = password
    user.role = await RoleModel.findOneBy({ uuid: roleId }) as RoleModel

    user = await this.Model.save(user)
    return this.adapter.modelToEntity(user)
  }

  public findById = async (uuid: string): Promise<UserEntity> => {
    const user = await this.Model.findOne({
      select: {
        uuid: true,
        email: true,
        password: true,
        role: {
          uuid: true
        }
      },
      relations: {
        role: true
      },
      where: { uuid }
    })

    if (user === null) throw new UserNotFoundError()
    return this.adapter.modelToEntity(user)
  }

  public findByEmail = async (email: string): Promise<UserEntity | null> => {
    const user = await this.Model.findOne({
      select: {
        uuid: true,
        email: true,
        password: true,
        role: {
          uuid: true
        }
      },
      relations: {
        role: true
      },
      where: { email }
    })

    if (user === null) return null
    return this.adapter.modelToEntity(user)
  }

  public update = async (uuid: string, model: Partial<UserEntity>): Promise<void> => {
    const { email, password } = model
    const user = await this.findById(uuid)

    user.email = email as string
    user.password = password as string

    await this.Model.save(user)
  }

  public delete = async (uuid: string): Promise<void> => {
    const user = await this.Model.findOneBy({ uuid })

    if (user === null) throw new UserNotFoundError()
    await this.Model.remove(user)
  }
}

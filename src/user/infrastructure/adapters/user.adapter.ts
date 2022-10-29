import { UserEntity } from '../../domain/user.entity'
import { UserModel } from '../models/user.model'

export class UserAdapter {
  public modelToEntity = (model: UserModel): UserEntity => {
    const { uuid, email, password, role } = model

    return {
      uuid,
      email,
      password,
      roleId: role.uuid
    }
  }
}

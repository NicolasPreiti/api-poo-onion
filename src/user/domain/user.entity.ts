export interface UserEntity {
  uuid?: string
  email: string
  password: string
  roleId: number
}

export type UserEntityNotRelations = Omit<UserEntity, 'roleId'>

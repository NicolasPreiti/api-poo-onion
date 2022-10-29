import { UserEntityNotRelations } from '../../domain/user.entity'
import { IsString, IsNotEmpty, Length, IsEmail } from 'class-validator'

export class UserCreateDTO implements UserEntityNotRelations {
  @IsNotEmpty()
  @IsEmail()
    email!: string

  @IsNotEmpty()
  @IsString()
  @Length(6)
    password!: string
}

import { IsEmail, IsNotEmpty, IsOptional, IsString, Length } from 'class-validator'
import { UserEntity } from '../../domain/user.entity'

export class UserUpdateDTO implements Partial<UserEntity> {
  @IsOptional()
  @IsNotEmpty()
  @IsEmail()
    email!: string

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  @Length(6)
    password!: string
}

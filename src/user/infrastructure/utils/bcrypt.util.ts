import bcrypt from 'bcrypt'
import { IEncrypt } from '../../../shared/interfaces/encrypt.interface'

export class Bcrypt implements IEncrypt {
  public salt: number

  constructor (salt: number) {
    this.salt = salt
  }

  public encrypt = async (data: string): Promise<string> => {
    return await bcrypt.hash(data, this.salt)
  }

  public compareHash = async (data: string, encrypt: string): Promise<boolean> => {
    return await bcrypt.compare(data, encrypt)
  }
}

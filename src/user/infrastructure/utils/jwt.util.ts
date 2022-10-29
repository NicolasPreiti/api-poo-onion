import jwt, { SignOptions } from 'jsonwebtoken'
import { InvalidTokenError } from '../../../shared/errors/invalid-token-error'
import { IAuthentication, IToken } from '../../../shared/interfaces/authentication.interface'

export class Jwt implements IAuthentication {
  private readonly privateKey: string
  private readonly options: SignOptions

  constructor () {
    this.privateKey = 'hotdog'
    this.options = {
      expiresIn: '1d'
    }
  }

  public generateToken = (data: IToken): string => {
    return jwt.sign(data, this.privateKey, this.options)
  }

  public decodeToken = (token: string): IToken => {
    try {
      return jwt.verify(token, this.privateKey) as IToken
    } catch (err) {
      throw new InvalidTokenError()
    }
  }
}

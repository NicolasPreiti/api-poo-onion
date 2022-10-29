export interface IToken {
  user: {
    uuid: string
    roleId: number
  }
}

export interface IAuthentication {
  generateToken: (data: IToken) => string
  decodeToken: (token: string) => IToken
}

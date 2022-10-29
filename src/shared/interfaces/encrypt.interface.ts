export interface IEncrypt {
  salt?: number
  encrypt: (data: string) => string | Promise<string>
  compareHash: (data: string, encrypt: string) => boolean | Promise<boolean>
}

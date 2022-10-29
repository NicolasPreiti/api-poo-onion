import { Response, Request } from 'express'
import { IToken } from './authentication.interface'

export type SuccessfullCode = 200 | 201 | 204
export type ClientErrorCode = 400 | 401 | 403 | 404
export type ServerErrorCode = 500 | number
type Status = 'OK' | 'FAILED'

interface ResBody {
  code: SuccessfullCode | ClientErrorCode | ServerErrorCode
  data?: object | any[]
  error?: object | any[]
  status: Status
}

export interface TypedResponse extends Response<ResBody> {
}

export interface TokenRequest extends Request {
  token: IToken
}

export interface IHttpResponse {
  send: (res: TypedResponse, status: SuccessfullCode, data?: object | any[]) => TypedResponse

  sendError: (res: TypedResponse, status: ClientErrorCode | ServerErrorCode | undefined, error?: object | any[]) => TypedResponse
}

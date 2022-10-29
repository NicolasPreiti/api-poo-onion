import { ClientErrorCode, IHttpResponse, ServerErrorCode, SuccessfullCode, TypedResponse } from '../interfaces/http.interface'

export class HttpResponse implements IHttpResponse {
  public send = (res: TypedResponse, status: SuccessfullCode, data?: object | any[]): TypedResponse => {
    return res.status(status).json({
      status: 'OK',
      code: status,
      data
    })
  }

  public sendError = (res: TypedResponse, status: ClientErrorCode | ServerErrorCode = 500, error?: object | any[] | undefined): TypedResponse => {
    return res.status(status).json({
      status: 'FAILED',
      code: status,
      error
    })
  }
}

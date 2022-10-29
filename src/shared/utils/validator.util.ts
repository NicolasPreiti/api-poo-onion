import { validate, ValidatorOptions } from 'class-validator'
import { NextFunction } from 'express'
import { IHttpResponse, TypedResponse } from '../interfaces'

export class DtoValidator {
  private readonly response: IHttpResponse
  private readonly options: ValidatorOptions

  constructor (response: IHttpResponse) {
    this.response = response
    this.options = {
      validationError: {
        target: false
      }
    }
  }

  public validate = async (res: TypedResponse, next: NextFunction, dto: any): Promise<void> => {
    await validate(dto, this.options)
      .then((errors) => {
        errors.length > 0
          ? this.response.sendError(res, 400, errors)
          : next()
      })
  }
}

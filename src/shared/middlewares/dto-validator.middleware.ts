import { validate, ValidatorOptions } from 'class-validator'
import { NextFunction, Request, Response } from 'express'
import { BaseMiddleware } from '../base/base.middleware'
import { IHttpResponse } from '../interfaces'
import { DtoValidator } from '../utils/validator.util'

export class DtoMiddleware extends BaseMiddleware {
  private readonly validator: DtoValidator
  private readonly options: ValidatorOptions

  constructor (response: IHttpResponse) {
    super(response)
    this.validator = new DtoValidator(this.response)
    this.options = {
      validationError: {
        target: false
      }
    }
  }

  public validate = (dto: any): any => [
    async (req: Request, res: Response, next: NextFunction): Promise<void> => {
      try {
        dto = (dto).create(req)

        await validate(dto, this.options)
          .then((errors) => {
            errors.length > 0
              ? this.response.sendError(res, 400, errors)
              : next()
          })
      } catch (err: any) {
        this.response.sendError(res, err.status, err.message)
      }
    }
  ]
}

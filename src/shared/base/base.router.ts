import { Router } from 'express'
import { IHttpResponse } from '../interfaces/http.interface'
import { DtoMiddleware } from '../middlewares'

export abstract class BaseRouter<Controller, UseCase, Repository> {
  protected _router: Router
  protected controller!: Controller
  protected useCase!: UseCase
  protected repository!: Repository
  protected response!: IHttpResponse
  protected validator!: DtoMiddleware

  constructor () {
    this._router = Router()
  }

  public get router (): Router {
    return this._router
  }

  protected routes = (): void => {
  }
}

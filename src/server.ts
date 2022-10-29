import cors from 'cors'
import express from 'express'
import helmet from 'helmet'
import { UserRouter } from './user/infrastructure/routes/user.routes'

export class Server {
  private readonly _app: express.Application
  private readonly port = process.env.PORT ?? 3001

  constructor () {
    this._app = express()
    this.middlewares()
    this.routes()
  }

  public get app (): express.Application {
    return this._app
  }

  private readonly middlewares = (): void => {
    this._app.use(helmet())
    this._app.use(cors())
    this._app.use(express.json())
  }

  private readonly routes = (): void => {
    this._app.use('/', new UserRouter().router)
  }

  public start = (): unknown => {
    return this._app.listen(this.port, () => {
      console.log(`SERVER RUNNING ON PORT ${this.port}`)
    })
  }
}

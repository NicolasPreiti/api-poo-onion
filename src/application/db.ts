import { DataSource } from 'typeorm'
import { dbConfig } from './config/db.config'

export class Database {
  private readonly _dataSource: DataSource

  constructor () {
    this._dataSource = new DataSource({
      type: dbConfig.type,
      host: dbConfig.host,
      port: dbConfig.port,
      username: dbConfig.username,
      password: dbConfig.password,
      database: dbConfig.database,
      synchronize: dbConfig.synchronize,
      logging: dbConfig.logging,
      entities: dbConfig.entities,
      subscribers: dbConfig.subscribers,
      migrations: dbConfig.migrations
    })
  }

  public start = async (): Promise<unknown> => {
    return await this._dataSource.initialize()
      .then(() => console.log('DATABASE CONNECTED'))
      .catch((err) => console.error(err))
  }
}

import dotenv from 'dotenv'
import { RoleModel } from '../user/infrastructure/models/role.model'
import { UserModel } from '../user/infrastructure/models/user.model'

dotenv.config()
type DbType = 'mysql'

export const dbConfig = {
  type: process.env.DB_TYPE as DbType,
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: false,
  entities: [RoleModel, UserModel],
  subscribers: [],
  migrations: []
}

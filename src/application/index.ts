import { Database } from './db'
import { Server } from './server'

const server = new Server()
const database = new Database()
server.start()
database.start()

import { IUuid } from '../interfaces/uuid.interface'
import { v4 as uuid } from 'uuid'

export class Uuid implements IUuid {
  public generate = (): string => {
    return uuid()
  }
}

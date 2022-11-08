import request from 'supertest'
import { Database } from '../../src/application/db'
import { Server } from '../../src/application/server'
import { InvalidTokenError } from '../../src/shared/errors/invalid-token-error'
import { TokenNotProvidedError } from '../../src/shared/errors/token-not-provided.error'
import { UserEntity, UserEntityNotRelations } from '../../src/user/domain/user.entity'
import { EmailInUseError } from '../../src/user/infrastructure/errors/email-in-use.error'
import { NothingToUpdateError } from '../../src/user/infrastructure/errors/nothing-to-update.error'
import { MySqlRepository } from '../../src/user/infrastructure/repository/user.mysql.repository'

const server = new Server()
const database = new Database()
const repository = new MySqlRepository()
const api = request(server.app)

beforeAll(async () => {
  await database.start()
})

describe('POST /auth/signin', () => {
  const url = '/auth/signin'
  let uuid: string
  const user: UserEntityNotRelations = {
    email: 'test@example.com',
    password: '123456'
  }

  describe('201', () => {
    afterEach(async () => {
      await repository.delete(uuid)
    })

    test('should return a 201 status code', async () => {
      const response = await api
        .post(url)
        .send(user)

      expect(response.statusCode).toBe(201)
      uuid = response.body.data.user.uuid
    })

    test('should return a json', async () => {
      const response = await api
        .post(url)
        .send(user)

      expect(response.header['content-type']).toContain('json')
      uuid = response.body.data.user.uuid
    })
  })

  describe('400', () => {
    const badRequest: Array<Partial<UserEntity>> = [
      {},
      {
        email: 'test@example.com'
      },
      {
        password: '123456'
      },
      {
        email: 'bad@mail.com',
        password: '123'
      }
    ]

    test('should return a 400 status code', async () => {
      const response = await api
        .post(url)
        .send({})

      expect(response.statusCode).toBe(400)
    })

    test('should return a EmailInUseError', async () => {
      try {
        const before = async (): Promise<void> => {
          const response = await api
            .post(url)
            .send(user)

          uuid = response.body.data.user.uuid
        }

        await before()
        const response = await api
          .post(url)
          .send(user)

        expect(response.body.error).toBe(new EmailInUseError().message)
      } finally {
        const after = async (): Promise<void> => {
          await repository.delete(uuid)
        }
        await after()
      }
    })

    badRequest.forEach((bad) => {
      test('should return a bad request error', async () => {
        const response = await api
          .post(url)
          .send(bad)

        expect(response.statusCode).toBe(400)
      })
    })
  })
})

describe('POST /auth/login', () => {
  const url = '/auth/login'
  const userBase: UserEntityNotRelations = {
    email: 'test@example.com',
    password: '123456'
  }
  let uuid: string

  describe('200', () => {
    beforeAll(async () => {
      const response = await api.post('/auth/signin').send(userBase)
      uuid = response.body.data.user.uuid
    })

    afterAll(async () => {
      await repository.delete(uuid)
    })

    test('should return a 200 status code', async () => {
      const response = await api
        .post(url)
        .send(userBase)

      expect(response.statusCode).toBe(200)
    })

    test('should return a json', async () => {
      const response = await api
        .post(url)
        .send(userBase)

      expect(response.header['content-type']).toContain('json')
    })
  })

  describe('400', () => {
    const badRequest: Array<Partial<UserEntity>> = [
      {},
      {
        email: 'test@example.com'
      },
      {
        password: '123456'
      },
      {
        email: 'bad@example.com',
        password: '123'
      }
    ]

    test('should return a 400 status code', async () => {
      const response = await api
        .post(url)
        .send({})

      expect(response.statusCode).toBe(400)
    })

    badRequest.forEach((bad) => {
      test('should return a bad request error', async () => {
        const response = await api
          .post(url)
          .send(bad)

        expect(response.statusCode).toBe(400)
      })
    })
  })
})

describe('UPDATE /user', () => {
  const url = '/user'
  const userBase: UserEntityNotRelations = {
    email: 'test@example.com',
    password: '123456'
  }
  let uuid: string
  let token: string

  describe('204', () => {
    beforeAll(async () => {
      const response = await api
        .post('/auth/signin')
        .send(userBase)

      uuid = response.body.data.user.uuid
      token = response.body.data.token
    })

    test('should return a 204 status code', async () => {
      const response = await api
        .patch(url)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: '12313132'
        })

      expect(response.statusCode).toBe(204)
    })
  })

  describe('400', () => {
    const badRequest: Array<Partial<UserEntity>> = [
      {
        email: 'test@example.com'
      },
      {
        password: '1234'
      },
      {
        email: 'bad@example.com',
        password: '123'
      }
    ]

    test('should return a token not provided error', async () => {
      const response = await api
        .patch(url)
        .send({
          password: '12313132'
        })

      expect(response.body.error).toBe(new TokenNotProvidedError().message)
    })

    test('should return a invalid token error', async () => {
      const response = await api
        .patch(url)
        .set('Authorization', 'Bearer invalid token')
        .send({
          password: '12313132'
        })

      expect(response.body.error).toBe(new InvalidTokenError().message)
    })

    test('should return a nothing to update error', async () => {
      const response = await api
        .patch(url)
        .set('Authorization', `Bearer ${token}`)
        .send({
          invalidField: '12313132'
        })

      expect(response.body.error).toBe(new NothingToUpdateError().message)
    })

    badRequest.forEach((bad) => {
      test('should return a bad request error', async () => {
        const response = await api
          .patch(url)
          .set('Authorization', `Bearer ${token}`)
          .send(bad)

        expect(response.statusCode).toBe(400)
      })
    })
  })

  describe('404', () => {
    beforeAll(async () => {
      await repository.delete(uuid)
    })

    test('should return a 404 status code', async () => {
      const response = await api
        .patch(url)
        .set('Authorization', `Bearer ${token}`)
        .send({
          password: '12313132'
        })

      expect(response.statusCode).toBe(404)
    })
  })
})

describe('DELETE /user', () => {
  const url = '/user'
  const userBase: UserEntityNotRelations = {
    email: 'test@example.com',
    password: '123456'
  }
  let token: string

  describe('204', () => {
    beforeAll(async () => {
      const response = await api
        .post('/auth/signin')
        .send(userBase)

      token = response.body.data.token
    })

    test('should return a 204 status code', async () => {
      const response = await api
        .delete(url)
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(204)
    })
  })

  describe('400', () => {
    test('should return a token not provided error', async () => {
      const response = await api
        .delete(url)

      expect(response.body.error).toBe(new TokenNotProvidedError().message)
    })

    test('should return a invalid token error', async () => {
      const response = await api
        .delete(url)
        .set('Authorization', 'Bearer invalid token')

      expect(response.body.error).toBe(new InvalidTokenError().message)
    })
  })

  describe('404', () => {
    test('should return a 404 status code', async () => {
      const response = await api
        .delete(url)
        .set('Authorization', `Bearer ${token}`)

      expect(response.statusCode).toBe(404)
    })
  })
})

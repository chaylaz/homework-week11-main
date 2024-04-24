const request = require('supertest')

const app = require('../app')
const { sequelize } = require('../models')
const { queryInterface } = sequelize;

const BASE_URL = '/api/todo'

beforeAll( async () => {
  try {
    await queryInterface.bulkInsert('Todos', [
      {
        id:1001,
        title:'todo 1',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:1002,
        title:'todo 2',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:1003,
        title:'todo 3',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:1004,
        title:'todo 4',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id:1005,
        title:'todo 5',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {})
  } catch (err) {
    console.log(err)
  }
})

afterAll( async () => {
  try {
    await queryInterface.bulkDelete('Todos', null)
  } catch (err) {
    console.log(err)
  }
})

describe('GET List Todo /api/todo', () => {
  it('GET /api/todo', (done) => {
    request(app)
      .get(`${BASE_URL}`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const { body } = response
        expect(body.length).toEqual(5)
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('GET Detail Todo /api/todo/:id', () => {
  it('GET /api/todo/:id', (done) => {
    request(app)
      .get(`${BASE_URL}/1001`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const { body } = response
        const { id, title} = body
        expect(id).toEqual(1001)
        expect(title).toBe('todo 1')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('Test Todo Not Found', (done) => {
    request(app)
      .get(`${BASE_URL}/999`)
      .expect(404)
      .then(response => {
        const { body } = response
        const { name, message } = body
        expect(name).toBe('Error Not Found')
        expect(message).toBe('Todo Not Found')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('POST Create Todo /api/todo', () => {
  it('POST /api/todo', (done) => {
    const service = {
      id:1006,
      title:'todo 6',
      createdAt: new Date(),
      updatedAt: new Date(),
      destroyTime: new Date()
    }
    request(app)
      .post(`${BASE_URL}`)
      .send(service)
      .expect(201)
      .then(response => {
        const { body } = response
        const { message, data } = body
        const { id, title } = data
        expect(message).toBe('Todo Added Successfully')
        expect(id).toEqual(1006)
        expect(title).toBe('todo 6')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('PUT Update Todo /api/todo/:id', () => {
  it('PUT /api/todo/:id', (done) => {
    const service = {
      title:'todo 5 update'
    }
    request(app)
      .put(`${BASE_URL}/1005`)
      .send(service)
      .expect(200)
      .then(response => {
        const { body } = response
        const { message } = body
        expect(message).toBe('Todo Update Successfully')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('Test Todo Not Found', (done) => {
    const service = {
      title:'todo 6 update'
    }
    request(app)
      .put(`${BASE_URL}/999`)
      .send(service)
      .expect(404)
      .then(response => {
        const { body } = response
        const { name, message } = body
        expect(name).toBe('Error Not Found')
        expect(message).toBe('Todo Not Found')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

describe('DELETE Destroy Todo /api/todo/:id', () => {
  it('DELETE /api/todo/:id', (done) => {
    request(app)
      .delete(`${BASE_URL}/1001`)
      .expect('Content-Type', /json/)
      .expect(200)
      .then(response => {
        const { body } = response
        const { message } = body
        expect(message).toBe('Todo Delete Successfully')
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  it('Todo Delete Not Found', (done) => {
    request(app)
      .delete(`${BASE_URL}/999`)
      .expect('Content-Type', /json/)
      .expect(404)
      .then(response => {
        const { body } = response
        const { name, message } = body
        expect(name).toBe('Error Not Found')
        expect(message).toBe('Todo Not Found')
        done()
      })
      .catch(err => {
        done(err)
      })
  })
})

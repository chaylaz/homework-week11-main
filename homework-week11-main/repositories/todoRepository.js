const { Todo } = require('../models')

class TodoRepository {
  
  static findAll = async (params) => {
    try {
      const todo = await Todo.findAll(params)

      return todo
    } catch (err) {
      throw err
    }
  }

  static findByPk = async (params) => {
    try {
      const todo = await Todo.findByPk(params)
      if (!todo) {
        throw {name: 'ErrorNotFound', message: 'Todo Not Found'}
      } else {
        return todo
      }
    } catch (err) {
      throw err
    }
  }

  static create = async (params) => {
    try {
      const todo = await Todo.create(params, {
        returning: true
      })
      return todo
    } catch (err) {
      throw err
    }
  }

  static update = async (id, body) => {
    try {
      const todo = await Todo.findOne({
        where: {
          id
        }
      })

      if (!todo) {
        throw {name: 'ErrorNotFound', message: 'Todo Not Found'}
      } else {
        await todo.update(body)
      }
    } catch (err) {
      throw err
    }
  }

  static destroy = async (id) => {
    try {
      const todo = await Todo.findOne({
        where: {
          id
        } 
      })
  
      if (!todo) {
        throw {name: 'ErrorNotFound', message: 'Todo Not Found'}
      } else {
        await todo.destroy(id)
      }
    } catch (err) { 
      throw err
    }
  }
}

module.exports = TodoRepository
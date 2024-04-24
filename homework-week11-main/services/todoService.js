const TodoRepository = require('../repositories/todoRepository')

class TodoService {

  static findAll = async (params) => {
    try {
      const todo = await TodoRepository.findAll(params)
      return todo
    } catch (err) {
      throw err
    }
  }

  static findByPk = async (params) => {
    try {
      const todo = await TodoRepository.findByPk(params)
      return todo
    } catch (err) {
      throw err
    }
  }

  static create = async (params) => {
    try {
      const todo = await TodoRepository.create(params)
      return todo
    } catch (err) {
      throw err
    }
  }

  static update = async (params) => {
    try {
      const { id, body } = params
      await TodoRepository.update(id, body)
    } catch (err) {
      throw err
    }
  }

  static destroy = async (params) => {
    try {
      const { id } = params
      await TodoRepository.destroy(id)
    } catch (err) {
      throw err
    }
  }
}

module.exports = TodoService
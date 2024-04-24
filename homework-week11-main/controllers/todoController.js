const TodoService = require('../services/todoService')

class TodoController {

  static findAll = async (req, res, next) => {
    try {
      const todo = await TodoService.findAll(req.query)

      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
    
  }

  static findByPk = async (req, res, next) => {
    try {
      const todo = await TodoService.findByPk(req.params.id)

      res.status(200).json(todo)
    } catch (err) {
      next(err)
    }
    
  }

  static create = async (req, res, next) => {
    try {
      const todo = await TodoService.create(req.body)
      res.status(201).json({
        message: 'Todo Added Successfully',
        data: todo
      })
    } catch (err) {
      next(err)
    }

  }

  static update = async (req, res, next) => {
    try {
      const params = {
        id: req.params.id,
        body: req.body
      }
      await TodoService.update(params)
      res.status(200).json({message: 'Todo Update Successfully'})
    } catch (err) {
      next(err)
    }

  }

  static destroy = async (req, res, next) => {
    try {
      const params = {
        id: req.params.id
      }
      await TodoService.destroy(params)
      res.status(200).json({message: 'Todo Delete Successfully'})
    } catch (err) {
      next(err)
    }

  }
}

module.exports = TodoController
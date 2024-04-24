const express = require('express')
const router = express.Router()

const todoRouter = require('./todoRoute')

router.use('/api/todo', todoRouter)

module.exports = router


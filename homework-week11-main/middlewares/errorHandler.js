const errorHandler = (err, req, res, next) => {
  console.log(err)

  if (err.name === "ErrorNotFound"){
    res.status(404).json({name: 'Error Not Found', message: err.message})
  }
}

module.exports = errorHandler
'use strict'

const http = require('http')
const app = require('./app/setup')

console.log('Going to create server on http://%s:%d', 'localhost', '5001')
  http.createServer(app).listen(5001, () => {
    console.log('server listening on http://%s:%d', 'localhost', '5001')
  })

module.exports = app
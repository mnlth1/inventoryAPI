'use strict'

module.exports.pingService = (req, res, next) => {
    res.statusCode = 200,
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({status: 'Up'}))
}
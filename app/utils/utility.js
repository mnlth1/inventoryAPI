'use strict'

module.exports.sendResponse = (statusCode, obj, req, res) => {
    res.statusCode = statusCode
    switch(statusCode) {
        case 200:
        case 201:
            res.setHeader('Content-Type', 'application/json')
            res.end(JSON.stringify(obj || {}, null, 2))
            break;
        case 202:
        case 204:
            res.end();
            break;
        case 400:
        case 403:
        case 404:
        case 409:
        default:
            res.setHeader('Content-Type', 'application/json');
            res.end(JSON.stringify({errors: [{status: statusCode, title: http.STATUS_CODES[statusCode]}]}, null, 2));
            break; 
    }
}

module.exports.processError = (err, req, res, next) => {
    if(typeof err != 'object') {
        err = {
            message: String(err)
        }
    } else {
        Object.defineProperty(err, 'message', {enumerable: true})
    }
    switch (err.name) {
        /* case 'BadRequest':
          res.statusCode = 400;
          break;
        case 'Conflict':
          res.statusCode = 409;
          break;
        case 'NotFound':
          res.statusCode = 404;
          break;
        case 'Timeout':
          res.statusCode = 500;
          break;
        case 'SystemError':
          res.statusCode = 500;
          break;
        case 'Forbidden':
          res.statusCode = 403;
          break;
        case 'ValidationError':
          res.statusCode = 400;
          break;
        case 'SyntaxError':
          res.statusCode = 400;
          break;
        case 'DataStoreError':
          res.statusCode = 500;
          break;
        case 'ClientError':
          res.statusCode = 500;
          break;
        case 'CacheStoreError':
          res.statusCode = 500;
          break; */
        default:
          res.statusCode = 500;
          break;
    }
    res.setHeader('Content-Type', 'application/json')
    res.end(JSON.stringify({errors: [{status: res.statusCode, title: err.name, message: err.message}]}))
}
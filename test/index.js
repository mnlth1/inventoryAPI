'use strict'

process.env.STUBS = 'dynamoose'
const test = require('tape')
require('../app/setup')
require('./items')

test.onFinish(function() {
    process.exit(0)
}) 
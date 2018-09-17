'use strict'

const mocksArray = process.env.STUBS ? process.env.STUBS.split(',') : []
const fs = require('fs')

module.exports.mocks = () => {
    for(let i of mocksArray) {
        if(fs.existsSync(__dirname.concat(`/${i}.js`))) {
            require(`${i}`)
        }
    }
}

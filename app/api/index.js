'use strict'

const fs = require('fs')

exports.readSpec = () => {
    const info = fs.readFileSync(__dirname + '/parts/info.yaml', 'utf8');
    const errors = fs.readFileSync(__dirname + '/parts/definitions/errors.yaml', 'utf8')

    const parts = {
        ping: {
          path: fs.readFileSync(__dirname + '/parts/paths/ping.yaml', 'utf8'),
          defn: fs.readFileSync(__dirname + '/parts/definitions/ping.yaml', 'utf8')
        },
        apps: {
          path: fs.readFileSync(__dirname + '/parts/paths/apps.yaml', 'utf8'),
          defn: fs.readFileSync(__dirname + '/parts/definitions/apps.yaml', 'utf8')  
        }
    }

    return {
        info: info,
        errors: errors,
        parts: parts
    }
}
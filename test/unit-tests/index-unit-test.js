const api = require('../../app/api/index')
const fs = require('fs')

describe('readSpec', () => {
    const info = fs.readFileSync('./app/api/parts/info.yaml', 'utf8');
    const errors = fs.readFileSync('./app/api/parts/definitions/errors.yaml', 'utf8')

    const parts = {
        ping: {
          path: fs.readFileSync('./app/api/parts/paths/ping.yaml', 'utf8'),
          defn: fs.readFileSync('./app/api/parts/definitions/ping.yaml', 'utf8')
        },
        apps: {
          path: fs.readFileSync('./app/api/parts/paths/apps.yaml', 'utf8'),
          defn: fs.readFileSync('./app/api/parts/definitions/apps.yaml', 'utf8')  
        }
    }

    let result = api.readSpec()
    it('Should contain specification details', () => {
        expect(JSON.stringify(result.info)).toBe(JSON.stringify(info))
        expect(JSON.stringify(result.errors)).toBe(JSON.stringify(errors))
        expect(JSON.stringify(result.parts)).toBe(JSON.stringify(parts))
    })
})
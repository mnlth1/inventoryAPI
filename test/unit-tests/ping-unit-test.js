const pingServer = require('../../app/controllers/Ping')

describe('ping_Server', () => {
    let response = {
        jsonString: '',
        kvmap: [],
        setHeader: function(key, value) {
            this.kvmap[key] = value
        },
        end: function(jsonString) {
            this.jsonString = jsonString
        }
    }

    pingServer.pingService({}, response, {})
    it('Unit test for ping service', () => {
        expect(response.kvmap['Content-Type']).toBe('application/json')
        let json = JSON.parse(response.jsonString)
        expect(json.status).toBe('Up')
    })
})
const test = require('tape')
const request = require('supertest')
const app = require('../app/setup')

var AWS = require('aws-sdk-mock')

let itemId = 101
let response = null

/* const items = {
    'availableCount': 1,
    'itemType': 'Magazine',
    'id': '111',
    'code': 'abc1',
    'availability': true,
    'itemCategory': 'Books'
} */

//module.exports = (items) => {
    
    test('Get item details', function(t) {
        request(app)
        .get(`/api/inventory/${itemId}`)
        .expect(200)
        .expect('Content-Type', 'application/json')
        .end(function(err, res){
            t.error(err, 'Fetch item details')
            response = res.body
            t.end()
        })
    }) 
//}
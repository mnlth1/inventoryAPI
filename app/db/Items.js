'use strict'

// Load the SDK for JavaScript
var AWS = require('aws-sdk');
// Set the region 
AWS.config.update({
  region: 'ap-southeast-2',
  endpoint: 'http://localhost:8000'
})

module.exports.getItemById = (itemId) => {

console.log(`Request to get details on ${itemId}`)
var docClient = new AWS.DynamoDB.DocumentClient({apiVersion: '2012-08-10'});

var params = {
 TableName: 'Items',
 Key: {'id': itemId}
};

return new Promise (function(resolve, reject){
    console.log(`Before db call ${params}`)
    docClient.get(params, function(err, data) {
        if (err) {
          console.log('Error: ', err);
          reject(err)
        } else {
          console.log('Success: ', data.Item);
          resolve(data.Item)
        }
      })
})

}
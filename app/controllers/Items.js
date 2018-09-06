'use strict'

const itemDb = require('../db/Items')
const util = require('../utils/utility')

module.exports.getItem = (req, res, next) => {
    console.log('Retrieve item details from inventory')
    const itemId = req.swagger.params.itemId.value
    console.log(`Item details requested for: ${itemId}`)
    
    itemDb.getItemById(itemId).then((itemData) => {
        util.sendResponse(200, itemData, req, res)
    })
    .catch(function(err) {
        console.error(`Error retrieving data from DB: ${err}`)
        util.processError(err, req, res, next)
    })
}
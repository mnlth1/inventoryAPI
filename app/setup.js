'use strict'

const swaggerTools = require('swagger-tools')
const fs = require('fs')
const jsyaml = require('js-yaml')
const api = require('./api')

var connect = require('connect')
var app = connect()

const pingController = require('./controllers/Ping')
const itemsController = require('./controllers/Items')

const options = {
    controllers: {
        ping: pingController.pingService,
        getItem: (req, res, next) => {itemsController.getItem(req, res, next)}
    }
}

/*     let components = api.readSpec()
    let spec = components.info

    for(const pathKey in components.parts) {
        spec += components.parts[pathKey].path
    }

    spec += components.errors

    for(const defnKey in components.parts) {
        spec += components.parts[defnKey].defn
    }

    console.log('swagger yaml path: ' + fs.realpathSync(__dirname + '/api/swagger.yaml'))
    fs.writeFileSync(__dirname + '/api/swagger.yaml', spec)

    let swaggerDoc = jsyaml.safeLoad(spec)
    fs.writeFile(__dirname + '/api/swagger.json', JSON.stringify(swaggerDoc, null, 2), (err) => {
        if(err) {
            console.log('Error while writing swagger yaml file')
        }
    })
    swaggerDoc.host = "localhost:5001"
    console.log('Swagger doc generated successfully ' + swaggerDoc) */

    const buildSwagger = function () {
        let components = api.readSpec()
        let spec = components.info
    
        for(const pathKey in components.parts) {
            spec += components.parts[pathKey].path
        }
    
        spec += components.errors
    
        for(const defnKey in components.parts) {
            spec += components.parts[defnKey].defn
        }
    
        console.log('swagger yaml path: ' + fs.realpathSync(__dirname + '/api/swagger.yaml'))
        fs.writeFileSync(__dirname + '/api/swagger.yaml', spec)
    
        let swaggerDoc = jsyaml.safeLoad(spec)
        fs.writeFile(__dirname + '/api/swagger.json', JSON.stringify(swaggerDoc, null, 2), (err) => {
            if(err) {
                console.log('Error while writing swagger yaml file')
            }
        })
        swaggerDoc.host = "localhost:5001"
        console.log('Swagger doc generated successfully ' + swaggerDoc)
        return swaggerDoc
      }
      
    let swaggerDoc = buildSwagger()
    
    swaggerTools.initializeMiddleware(swaggerDoc, function (middleware) {
        app.use(middleware.swaggerMetadata())
        app.use(middleware.swaggerValidator())
        //app.use(middleware.swaggerSecurity())
        console.log('before router')
        app.use(middleware.swaggerRouter(options))
        console.log('after router')

        app.use((err, req, res, next) => {
            res.setHeader('ContentType', 'application/json'),
            res.end(JSON.stringify({errors: [err]}))
        })
        app.use(middleware.swaggerUi())

    })

 module.exports = app;
const express = require('express')
const controller = require('../controller/controller')

const router = express.Router()

const initWebRoutes = (app) => {
    router.get('/', controller.handleHome)
    router.get('/users', controller.handleUser)
    router.post('/users/create-user', controller.handleCreateUser)
    router.post('/delete-user/:id', controller.handleDeleteUser)
    router.post('/update-user/:id', controller.getUpdateUser)
    router.post('/users/update-user', controller.handleUpdateUser)
    return app.use('/', router)
}

module.exports = initWebRoutes


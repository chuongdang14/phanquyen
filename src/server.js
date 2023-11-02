const express = require('express')
const configViewEngine = require('./config/viewEngine')
const initWebRoutes = require('./routes/webRoutes')
const bodyParser = require('body-parser')
require('dotenv').config()

const app = express()
const PORT = process.env.PORT

configViewEngine(app)

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

initWebRoutes(app)


app.listen(8899, () => {
    console.log('listening on port', 8899)
})
const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const homeRoutes = require('./routes/home')
const installRoutes = require('./routes/install')

require('dotenv').config({path: './config/.env'})

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/slack', installRoutes)
app.use('/', homeRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    
const express = require('express')
const app = express()
const homeRoutes = require('./routes/home')
const installRoutes = require('./routes/install')

require('dotenv').config({path: './config/.env'})


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes)
app.use('/slack', installRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    
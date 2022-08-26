const express = require('express')
const app = express()
const homeRoutes = require('./routes/home')

require('dotenv').config({path: './config/.env'})


app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/', homeRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    
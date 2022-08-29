const express = require('express')
const app = express()
const bodyParser = require('body-parser')
const homeRoutes = require('./routes/home')
const installRoutes = require('./routes/install')

require('dotenv').config({path: './config/.env'})

// Not sure how exactly this works yet, but this helps in parsing our raw body from every request to our server
const rawBodyBuffer = (req, res, buf, encoding) => {
    if (buf && buf.length) {
        req.rawBody = buf.toString(encoding || 'utf8');
    }
};

app.use(bodyParser.urlencoded({ verify: rawBodyBuffer, extended: true }));
app.use(bodyParser.json({ verify: rawBodyBuffer }));

app.use('/slack', installRoutes)
app.use('/', homeRoutes)
 
app.listen(process.env.PORT, ()=>{
    console.log('Server is running, you better catch it!')
})    
const express = require('express')
const router = express.Router()
const installController = require('../controllers/install')

router.post('/', installController.getInstall) 

module.exports = router
const express = require('express')
const router = express.Router()
const installController = require('../controllers/install')

router.get('/', installController.getInstall) 

module.exports = router
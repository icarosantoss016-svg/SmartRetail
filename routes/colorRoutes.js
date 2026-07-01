const express = require('express')
const router = express.Router()
const colorController = require('../controllers/colorController')

router.post('/', colorController.getCorComplementar)

router.post('/camera',colorController.receberCorCamera)

module.exports = router
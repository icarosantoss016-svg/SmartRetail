const express = require ('express')
const router = express.Router()
const usuarioController = require('../controllers/usuarioController')
const { route } = require('./authRoutes')

router.post('/', usuarioController.criarUsuario)

module.exports = router
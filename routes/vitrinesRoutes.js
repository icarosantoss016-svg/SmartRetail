const express = require('express')
const router = express.Router()
const vitrineController = require('../controllers/vitrineController')
const authMiddleware = require('../middlewares/authMiddleware')


router.post('/', authMiddleware,vitrineController.criarVitrine)
router.get('/',authMiddleware,vitrineController.listarVitrines)
router.get('/:id',authMiddleware,vitrineController.buscarVitrineId)
router.put('/:id',authMiddleware,vitrineController.atualizarVitrine)
router.patch('/:id',authMiddleware,vitrineController.atualizarStatusVitrine)
router.delete('/:id',authMiddleware,vitrineController.deletarVitrine)

module.exports =router
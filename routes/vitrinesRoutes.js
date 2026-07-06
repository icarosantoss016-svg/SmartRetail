const express = require('express')
const router = express.Router()
const vitrineController = require('../controllers/vitrineController')
const authMiddleware = require('../middlewares/authMiddleware')
const vitrineEstado = require('../config/vitrineEstado.js')


router.post('/', authMiddleware,vitrineController.criarVitrine)
router.get('/',authMiddleware,vitrineController.listarVitrines)
router.get('/:id',authMiddleware,vitrineController.buscarVitrineId)
router.put('/:id',authMiddleware,vitrineController.atualizarVitrine)
router.patch('/:id',authMiddleware,vitrineController.atualizarStatusVitrine)
router.delete('/:id',authMiddleware,vitrineController.deletarVitrine)

router.get('/:id/estado', (req, res) => {
    const idVitrine = req.params.id
    const estado = vitrineEstado.obterEstadoCompleto(idVitrine) 

    return res.status(200).json(estado)
})

module.exports =router
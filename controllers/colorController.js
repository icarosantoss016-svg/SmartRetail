const mqttClient = require('../config/mqtt')
const vitrineEstado = require ('../config/vitrineEstado')


function getCorComplementar(req, res){
    const { hex } = req.body

    if(!hex){
        return res.status(400).json({erro: 'Campo hex é obrigatório.'})
    }

    const r = parseInt(hex.slice(1, 3), 16)
    const g = parseInt(hex.slice(3, 5), 16)
    const b = parseInt(hex.slice(5, 7), 16)

    const compR = (255 - r).toString(16).padStart(2, '0')
    const compG = (255 - g).toString(16).padStart(2, '0')
    const compB = (255 - b).toString(16).padStart(2, '0')

    const complementar = `#${compR}${compG}${compB}`

    return res.json({ complementar })

}

function receberCorCamera(req,res){
    const {hex} =req.body

    if(!hex){
        return res.status(400).json({erro: 'Campo hex é obrigátório'})
    }

    if(vitrineEstado.obterProdutoAtivo() !==null){
        return res.status(200).json({
            ignorado: true,
            motivo: 'Produto NFC ativo'
        })
    }

    const payloadCor = JSON.stringify({hex: hex})

    mqttClient.publish('vitrine/cor', payloadCor)

    console.log(`[Câmera] Cor do cliente (${hex}) enviada para o LED da vitrine`)

    return res.status(200).json({sucesso: true, cor:hex})
}

module.exports = { getCorComplementar, receberCorCamera }
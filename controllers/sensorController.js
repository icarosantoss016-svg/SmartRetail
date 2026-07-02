const PresencaLog = require('../models/presenca_log')
const ScanLog = require('../models/scan_log')
const Produtos = require('../models/produto')
const vitrineEstado = require('../config/vitrineEstado')
const mqttClient = require('../config/mqtt') 

async function detectarPresenca(idVitrine, payload) {
    const {duracaoMs, distanciaMedia, intensidadeLed} = payload

    if(!duracaoMs){
        return console.log(`[Vitrine ${idVitrine}] Presença não detectada.`)
    }

    try {
        const produtoIdInteragido = vitrineEstado.obterProdutoAtivo(idVitrine)

        await PresencaLog.create({
       entrada: new Date(Date.now() - duracaoMs),
            saida: new Date(),
            duracao: duracaoMs,
            produtoId: produtoIdInteragido,
            idVitrine: idVitrine,
            distanciaMedia: distanciaMedia, 
            intensidadeLed: intensidadeLed  
        })

         console.log(`[Vitrine ${idVitrine}] Presença registrada. Duração: ${duracaoMs / 1000}s | Dist: ${distanciaMedia}cm | LED: ${intensidadeLed}%`)

         vitrineEstado.limpar(idVitrine)

    } catch (error) {   
        console.error(`Erro ao registrar presença da Vitrine ${idVitrine}:`, error.message)
    }
}

async function detectarNfc(idVitrine, payload) {
    const { nfcTag } = payload

    try {
        const produto = await Produtos.findOne({ where: { nfcTag } })

        if (!produto) {
            console.log(`Tag ${nfcTag} não encontrada no banco.`)
            return
        }

        await ScanLog.create({ produtoId: produto.produtoId })
        console.log(`[Vitrine ${idVitrine}] Produto escaneado: ${produto.nome}`)
        
        vitrineEstado.definirProdutoAtivo(idVitrine, produto.produtoId)

        if (produto.cor) {
            const payloadCor = JSON.stringify({ hex: produto.cor })
            mqttClient.publish(`vitrine/${idVitrine}/cor`, payloadCor)
            console.log(`[MQTT] Cor ${produto.cor} enviada exclusivamente para a Vitrine #${idVitrine}`);
        }

    } catch (err) {
        console.error('Erro ao processar NFC via MQTT:', err.message)
    }
}


module.exports = { detectarPresenca, detectarNfc }
const estadosPorVitrine = {}

module.exports = {
    definirCorCamera(idVitrine, corHex){
        if(!estadosPorVitrine[idVitrine]){ 
            estadosPorVitrine[idVitrine] = {
                produtoId: null,
                timestampDoScan: null,
                corCamera: '#000000'
            }
        }
        estadosPorVitrine[idVitrine].corCamera = corHex
    },
    
    definirProdutoAtivo(idVitrine, produtoId){
        if(!estadosPorVitrine[idVitrine]){
            estadosPorVitrine[idVitrine] = { corCamera: '#000000' }
        }

        estadosPorVitrine[idVitrine].produtoId = produtoId
        estadosPorVitrine[idVitrine].timestampDoScan = Date.now()
        console.log(`[ESTADO] Vitrine #${idVitrine}: Produto ${produtoId} ativo.`) // Correção ID
    },

    obterEstadoCompleto(idVitrine){
        const estado = estadosPorVitrine[idVitrine]
        if(!estado){
            return {
                produtoId: null,
                corCamera: '#dee8e9'
            }
        }

        const tempoMaximo = 30 * 1000 
        if (estado.produtoId && (Date.now() - estado.timestampDoScan > tempoMaximo)) {
            console.log(`[ESTADO] Scan da Vitrine #${idVitrine} expirou`)
            estado.produtoId = null
        }

        return {
            produtoId: estado.produtoId,
            corCamera: estado.corCamera
        }
    },
    
    obterProdutoAtivo(idVitrine){
        const estado = this.obterEstadoCompleto(idVitrine)
        return estado.produtoId
    },

    limpar(idVitrine) {
        delete estadosPorVitrine[idVitrine];
        console.log(`[ESTADO DA VITRINE] Memória limpa para a Vitrine #${idVitrine}.`)
    }
}
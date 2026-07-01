const estadosPorVitrine = {}

module.exports = {
    definirProdutoAtivo(idVitrine, produtoId) {
        estadosPorVitrine[idVitrine] = {
            produtoId: produtoId,
            timestampDoScan: Date.now()
        };
        console.log(`[ESTADO DA VITRINE] Vitrine #${idVitrine}: Produto ${produtoId} agora está ativo.`)
    },

    obterProdutoAtivo(idVitrine) {
        const estado = estadosPorVitrine[idVitrine];
        if (!estado) return null

        const tempoMaximo = 5 * 60 * 1000 
        if (Date.now() - estado.timestampDoScan > tempoMaximo) {
            console.log(`[ESTADO DA VITRINE] O scan da Vitrine #${idVitrine} expirou por tempo.`)
            this.limpar(idVitrine)
            return null
        }
        return estado.produtoId
    },

    limpar(idVitrine) {
        delete estadosPorVitrine[idVitrine];
        console.log(`[ESTADO DA VITRINE] Memória limpa para a Vitrine #${idVitrine}.`)
    }
};
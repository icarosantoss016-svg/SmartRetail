const Produtos = require('../models/produto')
const ScanLog = require('../models/scan_log') 
const vitrineEstado = require('../config/vitrineEstado') 
const mqttClient = require('../config/mqtt') 

async function criarProduto(req, res){
    const { nome, categoria, preco, cor, nfcTag, tipoTecido,imagem } = req.body
    if(!nome || !categoria || !preco || isNaN(preco) || !cor || !nfcTag
    || !tipoTecido|| !imagem){
        return res.status(400).json({erro: 'Nome, categoria, preço, cor,nfcTag e imagem devem estar preenchidos.'})
    }
    const novoProduto = await Produtos.create({ nome, categoria, preco, cor, nfcTag, tipoTecido, imagem })
    res.status(201).json(novoProduto)
}   

async function buscarProdutoId(req, res) {
    try {
        const produto = await Produtos.findByPk(req.params.id)

        if(!produto){
            return res.status(404).json({erro: "Produto não encontrado."})
        }

        await ScanLog.create({ produtoId: produto.produtoId })
        
        const idVitrine = req.query.vitrine ? parseInt(req.query.vitrine) : 1
        
        vitrineEstado.definirProdutoAtivo(idVitrine, produto.produtoId)

        if (produto.cor) {
            const payloadCor = JSON.stringify({ hex: produto.cor });
            mqttClient.publish(`vitrine/${idVitrine}/cor`, payloadCor);
            console.log(`[MQTT] Cor ${produto.cor} enviada para vitrine/${idVitrine}/cor`);
        }

        return res.status(200).json(produto)

    } catch (error) {
        console.error("Erro ao buscar produto por ID", error)
        return res.status(500).json({error: "Erro interno ao buscar produto"})
    }
}

async function listarProdutos(req,res){
    try {
        const produtos = await Produtos.findAll()
        return res.status(200).json(produtos)
    } catch (error) {
        console.error("Erro ao listar produtos", error)
        return res.status(500).json({error:"Erro interno ao buscar produtos"})
        
    }
}

async function deletarProduto(req,res) {
    try {
        const linhasDeletadas = await Produtos.destroy({
            where: {produtoId: req.params.id} 
        })

        if (linhasDeletadas === 0){
            return res.status(404).json({error:"Produto não encontrado"})
        }
        return res.status(200).json({mesnsagem:"Produto deletado com sucesso."})
    } catch (error) {
        console.error("Erro ao deletar produto", error)
        return res.status(500).json({ erro: "Erro ao deletar o produto." })
        
    }
}

async function atualizarProduto(req,res) {
    try {
        const id = req.params.id
        const dadosAtualizados= req.body

        const [linhasAfetadas] = await Produtos.update(dadosAtualizados,{
            where:{produtoId:id}
        })

        if(linhasAfetadas === 0){
            return res.status(404).json({error:"Produto não encontrado, nenhuma informação foi atualizada."})
        }
        return res.status(200).json({ mensagem: "Produto atualizado com sucesso." })
    } catch (error) {
           console.error("Erro ao atualizar produto:", error)
        return res.status(500).json({ erro: "Erro interno ao atualizar o produto." })
    }
}

module.exports = { criarProduto, buscarProdutoId,listarProdutos, deletarProduto, atualizarProduto }
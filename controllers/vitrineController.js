const Vitrine = require ('../models/vitrine')

exports.criarVitrine = async (req,res)=>{
    try {
        const {localizacao} = req.body

        if(!localizacao|| localizacao.trim()===""){
            return res.status(400).json({error:"Localização é obrigatória"})
        }
        const novaVitrine = await Vitrine.create({localizacao})

        res.status(201).json(novaVitrine)
    } catch (error) {
        console.error("Erro ao criar uma vitrine",error)
        return res.status(500).json({error:"Errro interno ao criar vitrine"})
    }

}

exports.listarVitrines = async (req,res)=>{
    try {
        const vitrine = await Vitrine.findAll()
        return res.status(200).json(vitrine)
    } catch (error) {
        console.error("Erro ao listar vitrines",error)
        return res.status(500).json({error:"Erro interno ao listar vitrines."})
    }
}

exports.buscarVitrineId = async (req,res)=>{
    try {
        const vitrine = await Vitrine.findByPk(req.params.id)

        if(!vitrine){
            return res.status(404).json({error:"Vitrine não encontrada."})
        }

        return res.status(200).json({vitrine})

    } catch (error) {
        console.error("Erro ao buscar o produto")
        return res.status(500).json({error:"Erro interno ao buscar produto."})
        
    }
}

exports.deletarVitrine = async (req,res)=>{
    try {
        const linhasDeletadas = await Vitrine.destroy({
            where:{idVitrine: req.params.id}
        })

        if(linhasDeletadas===0){
            return res.status(404).json({error: "Vitrine não encontrada."})
        }
        return res.status(200).json({mensagem:"Vitrine deletada com sucesso."})
    } catch (error) {
        console.error("Erro ao deletar a vitrine.")
        return res.status(500).json({error:"Erro interno ao deletar a vitrine."})
    }
}

exports.atualizarVitrine = async (req,res)=>{
    try {
        const vitrine = await Vitrine.findByPk(req.params.id)

        if(!vitrine){
            return res.status(404).json({error:"Vitrine não encontrada, nenhuma informação foi atualizada."})
        }

        const {localizacao} = req.body

        if(!localizacao|| localizacao.trim()===""){
            return res.status(400).json({error:"Localização é obrigatória"})
        }
        await vitrine.update({localizacao})

        res.status(200).json(vitrine)
    } catch (error) {
        console.error("Erro ao atualizar Vitrine", error)
        return res.status(500).json({error:"Erro interno ao ataulizar vitrine"})
    }
}

exports.atualizarStatusVitrine = async (req,res)=>{
    const vitrine = await Vitrine.findByPk(req.params.id)
    if(!vitrine){
        return res.status(404).json({error:"Vitrine não encontrada."})
    }
    const {statusVitrine} = req.body
    if(!statusVitrine|| statusVitrine.trim()===""){
        return res.status(400).json({error:"Status é obrigatório"})
    }

    const statusFormatado = statusVitrine.toUpperCase()

    if(!['ATIVA','DESATIVADA','MANUTENÇÃO'].includes(statusFormatado)){
        return res.status(400).json({error:"Status inválido. Os valores permitidos são ATIVA, DESATIVADA, MANUTENÇÃO."})
    }

    await vitrine.update({statusVitrine:statusFormatado})

    res.status(200).json({mensagem:"Status da vitrine ataulizado com sucesso",vitrine})
}

    

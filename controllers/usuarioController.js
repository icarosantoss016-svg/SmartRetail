const Usuario = require('../models/usuarios')
const bcrypt = require('bcrypt')

exports.criarUsuario = async (req,res)=>{
    try {
        const {login, senha} = req.body
        if(!login||login.trim()===""||login===null||login===undefined){
            return res.status(400).json ({error: 'Login é obrigatório.'})
        }

        if(!senha||senha.trim()===""||senha===null||senha===undefined){
            return res.status(400).json({error:'Senha é obrigatória'})
        }

        const salt = await bcrypt.genSalt(10)
        const senhaCriptografada = await bcrypt.hash(senha,salt)

        const novoUsuario = await Usuario.create({
            login:login,
            senha:senhaCriptografada
        })

        return res.status(201).json({messagem:'Usuário criado com sucesso.'})
    } catch (error) {
        console.error("Erro ao criar usuário: ",error)
        return res.status(500).json({error:"Erro interno ao criar usuário."})
        
    }
}
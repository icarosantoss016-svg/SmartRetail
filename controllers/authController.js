const jwt = require('jsonwebtoken')
const Usuario = require('../models/usuarios')
require('dotenv').config()
const SECRET = process.env.SECRET
const bcrypt = require('bcrypt')

exports.login = async (req, res) => {
    const { login, senha } = req.body

    if (!login || login.trim() === "" || !senha || senha.trim()==="") {
        return res.status(400).json({ error: 'Login e senha são obrigatórios.' })
    }
    try {
        const usuario = await Usuario.findOne({ where: {login} })
        if (!usuario) {
            return res.status(401).json({ error: 'Login ou senha inválidos.' })
        }
        const senhaCorreta = await bcrypt.compare(senha,usuario.senha)

        if(!senhaCorreta){
            return res.status(401).json({error: 'Login ou senha inválidos.'})
        }


    const token = jwt.sign({id:usuario.id, login:usuario.login}, SECRET, {expiresIn:'1H'})

    res.json({token})
    } catch (error) {
        console.error(error)
        res.status(500).json({error:'Erro ao autenticar usuário'})
        
    }
}
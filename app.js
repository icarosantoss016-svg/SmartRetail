const express = require('express')
const path = require('path')

const app = express()

app.set('view engine', 'ejs')//diz ao express para usar o EJS como motor visual
app.set('views', path.join(__dirname, 'views'))//seleciono o dir onde estão minhas views 

//Aqui eu permito que o Express leia o corpo das res
app.use(express.json())//leitura do JSON
app.use(express.urlencoded({ extended: true }))//leitura de formulários HTML

app.use(express.static(path.join(__dirname, 'public'))) //seleciono tudo dentro do dir public


//----------ROTAS-----------

const colorRoutes = require('./routes/colorRoutes')
const produtosRoutes = require('./routes/produtosRoutes')
const dashboardRoutes = require('./routes/dashboardRoutes')
const usuariosRoutes = require('./routes/usuarioRoutes')
const vitrineRoutes = require('./routes/vitrinesRoutes')
const authRoutes = require('./routes/authRoutes')



app.get('/', (req, res) => {
    res.send('<h1> Smart Retail — Servidor no ar!</h1>')
})

app.use('/sensor/color', colorRoutes)
app.use('/produtos', produtosRoutes)
app.use('/api/dashboard', dashboardRoutes)
app.use('/usuario', usuariosRoutes)
app.use('/vitrine', vitrineRoutes)
app.use('/auth', authRoutes)

module.exports = app 
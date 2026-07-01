// Aqui eu só vou usar para incializar o servidor HTTP
const app = require('./app')
const sequelize = require('./config/database')
const mqttClient = require('./config/mqtt')

//Pegando meus modelos
const Produtos = require('./models/produto')
const PresencaLog = require('./models/presenca_log')
const ScanLog = require('./models/scan_log')
const Usuarios = require('./models/usuarios')
const Vitrine = require('./models/vitrine')

//Fazendo o relacionamento aqui, já que é o úncio lugar do sistema onde junto todos os models
Produtos.hasMany(ScanLog, {foreignKey: 'produtoId', onDelete: 'CASCADE'})
ScanLog.belongsTo(Produtos, {foreignKey: 'produtoId'})
Produtos.hasMany(PresencaLog, {foreignKey: 'produtoId', onDelete: 'SET NULL'})
PresencaLog.belongsTo(Produtos, {foreignKey: 'produtoId'})
Vitrine.hasMany(PresencaLog, {foreignKey:'idVitrine', onDelete:'CASCADE'})
PresencaLog.belongsTo(Vitrine,{foreignKey:'idVitrine'})

const PORT = process.env.PORT || 3000

sequelize.sync()
    .then(()=>{
        console.log('Banco de dados sincronizado.')
        app.listen(PORT, ()=>{
            console.log(`Servidor rodando em http://localhost:${PORT}`)
    })
}).catch((err)=>{
        console.error('Erro ao incializar:', err)
})
const { DataTypes, Model } = require('sequelize')
const sequelize = require('../config/database')

const Usuarios = sequelize.define('Usuarios', {

    login: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    senha: {
        type: DataTypes.STRING,
        allowNull: false,
    }
})

module.exports = Usuarios
import { DataTypes } from 'sequelize'
import { database } from  '../database/bddApi.js'

const Usuario = database.define('Usuario', {
    
    nome: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    senha: {
        type: DataTypes.STRING,
    }
})

export { Usuario }

//inicio de tudo app, server, index... config inicial de tudo
import "dotenv/config"
import express from 'express'
console.log('🚀 Iniciando app...')

const app = express()

// Importar a conexao criada com sequelize
import { sequelize } from './database/bddApi.js'
console.log('📡 Importou sequelize') // LOG AQUI

//Importa outras functions e pastas
import { router } from './routes/rotasApi.js'

// Realizar a sincronização das configurações do sequelize com o banco de dados
try {
    console.log('🔁 Sincronizando com banco...')
    // Método para sincronizar
    await sequelize.sync({ alter: true }) // Força atlza a conexão sem apagar os dados
    console.log('✅ Sincronizado com sucesso')
} catch(err){
    console.error('❌ Erro ao sincronizar:', err)
}

app.use(express.json())
app.use(router)

app.listen(process.env.PORT, console.log('✅ Servidor iniciado com sucesso!'))
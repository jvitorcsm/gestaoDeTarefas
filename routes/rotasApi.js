// rotas são responsaveis pelos endpoints e pelos metodos https

import express from 'express'
import { verifyToken } from '../middlewares/verifyToken.js'
import { makeUser, sighIn } from '../controllers/usuario.js'
import { makeTask, task, deleteTask } from '../controllers/tarefas.js'

const router = express.Router()

router.post('/usuario', makeUser)
router.get('/login', sighIn)
router.post('/tarefas', verifyToken, makeTask)
router.delete('/tarefas', verifyToken, deleteTask)
router.get('/tarefas', verifyToken, task)

export { router }
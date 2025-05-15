// controllers/tarefas.js
import { Tarefas } from '../models/Tarefas.js';

const makeTask = async (req, res) => {
    try {
        const { titulo, descricao, status, id_usuario } = req.body;
        if (!titulo || !descricao || !status || !id_usuario) {
            return res.status(400).send({ mensagem: 'Dados incompletos' });
        }

        await Tarefas.create({ titulo, descricao, status, id_usuario });
        res.status(201).send({ mensagem: 'Tarefa criada' });
    } catch (err) {
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' });
    }
};

const task = async (req, res) => {
    try {
        const { id_usuario } = req.body;
        const tarefas = await Tarefas.findAll({ where: { id_usuario } });
        res.status(200).send({ tarefas });
    } catch (err) {
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' });
    }
};

const deleteTask = async (req, res) => {
    try {
        const { id_usuario, id } = req.body;

        const tarefa = await Tarefas.findByPk(id);

        if (!tarefa) {
            return res.status(404).send({ mensagem: 'Tarefa não encontrada' });
        }

        if (tarefa.id_usuario !== id_usuario) {
            return res.status(403).send({ mensagem: 'Essa tarefa pertence a outro usuário' });
        }

        await Tarefas.destroy({ where: { id, id_usuario } });
        res.status(200).send({ mensagem: 'Tarefa excluída com sucesso' });
    } catch (err) {
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' });
    }
};

export { makeTask, task, deleteTask };

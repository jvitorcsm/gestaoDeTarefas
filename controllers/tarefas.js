import { Tarefas } from '../models/Tarefas.js';

const makeTask = async (req, res) => {
  try {
    const { titulo, descricao, status } = req.body;
    const id_usuario = req.user.id_usuario;

    if (!titulo || !descricao || !status) {
      return res.status(400).send({ mensagem: 'Dados incompletos' });
    }

    await Tarefas.create({ titulo, descricao, status, id_usuario });
    res.status(201).send({ mensagem: 'Tarefa criada' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' });
  }
};

const task = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const tarefas = await Tarefas.findAll({ where: { id_usuario } });
    res.status(200).send({ tarefas });
  } catch (err) {
    console.log(err);
    res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' });
  }
};

const deleteTask = async (req, res) => {
  try {
    const id_usuario = req.user.id_usuario;
    const { id } = req.params;

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
    console.log(err);
    res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' });
  }
};

const atualizarStatusTarefa = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    const id_usuario = req.user.id_usuario;

    const tarefa = await Tarefas.findByPk(Number(id)); // <-- força número

    if (!tarefa || tarefa.id_usuario !== id_usuario) {
      return res.status(404).send({ mensagem: 'Tarefa não encontrada ou não pertence ao usuário' });
    }
    console.log('-> Atualizando tarefa', id, 'para status:', status, 'do usuário:', id_usuario)
    await tarefa.update({ status });
    res.status(200).send({ mensagem: 'Status atualizado' });
  } catch (err) {
    console.log(err);
    res.status(500).send({ mensagem: 'Erro ao atualizar status' });
  }
};

export { makeTask, task, deleteTask, atualizarStatusTarefa };

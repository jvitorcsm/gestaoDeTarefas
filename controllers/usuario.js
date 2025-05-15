// controllers/usuario.js
import { Usuario } from '../models/Usuario.js';
import jwt from 'jsonwebtoken';

const segredoJwt = process.env.SEGREDO_JWT;

const makeUser = async (req, res) => {
    try {
        const { nome, email, senha } = req.body;
        if (!nome || !email || !senha) {
            return res.status(400).send({ mensagem: 'Dados incompletos' });
        }

        const usuarioExistente = await Usuario.findOne({ where: { email } });
        if (usuarioExistente) {
            return res.status(400).send({ mensagem: 'Usuário já existe' });
        }

        await Usuario.create({ nome, email, senha });
        res.status(201).send({ mensagem: 'Usuário foi criado' });
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' });
    }
};

const sighIn = async (req, res) => {
    try {
        const { email, senha } = req.body;
        if (!email || !senha) {
            return res.status(400).send({ mensagem: 'Dados incompletos' });
        }

        const usuario = await Usuario.findOne({ where: { email } });
        if (!usuario) {
            return res.status(404).send({ mensagem: 'Usuário não encontrado' });
        }

        if (usuario.senha !== senha) {
            return res.status(403).send({ mensagem: 'Credenciais inválidas' });
        }

        const token = jwt.sign({ idUsuario: usuario.id }, segredoJwt, { expiresIn: '1d' });
        return res.status(201).send({ token });
    } catch (erro) {
        console.log(erro);
        res.status(500).send({ mensagem: 'Ocorreu um erro inesperado' });
    }
};

export { makeUser, sighIn };

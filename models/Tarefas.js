import { DataTypes } from "sequelize"
import { database } from "../database/bddApi.js"
import { Usuario } from "./Usuario.js"

const Tarefas = database.define('Tarefas', {
    id: {
        primaryKey: true,
        autoIncrement: true,
        type: DataTypes.INTEGER
    },
    titulo: {
        type: DataTypes.STRING,
    },
    descricao: {
        type: DataTypes.STRING,
    },
    status: {
        type: DataTypes.STRING,
    },
    id_usuario: {
        type: DataTypes.INTEGER,
    }
});

    export { Tarefas }
    
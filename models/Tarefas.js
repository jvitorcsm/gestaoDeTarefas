import { DataTypes } from "sequelize"
import { database } from "../database/bddApi.js"
import { Usuario } from "./Usuario.js"

const Tarefas = database.define('Tarefas', {
        id: {
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
        }
    })

    export { Tarefas }
    
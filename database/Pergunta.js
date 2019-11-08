const Sequelize = require("sequelize");
const connection = require("./dataBase");

const Pergunta = connection.define('perguntas',{
    //cria a tabela pergunta no banco de dados
    titulo:{
        type: Sequelize.STRING,
        allowNull: false
    },
    descricao:{
        type: Sequelize.TEXT,
        allowNull: false
    }
});

Pergunta.sync({force: false}).then(()=>{}); //verifica se a tabela já existe
module.exports = Pergunta;
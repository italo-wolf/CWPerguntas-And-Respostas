const Sequelize =  require('sequelize');
const connection = new Sequelize('guiaperguntas','root','210597',{
    host:'localhost',
    dialect: 'mysql'
});

module.exports = connection;
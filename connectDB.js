
const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'todos.db',
});
//module test here

module.exports = { sequelize};

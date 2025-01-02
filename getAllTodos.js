

const { sequelize } = require('./connectDB');
const Todo = require('./TodoModel');

const getAllTodos = async () => {
  try {
    const todos = await Todo.findAll({ raw: true, order: [['id', 'ASC']] });
    const todolist = todos.map((todo) => todo.displayableString()).join('\n');
    console.log(todolist);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await getAllTodos();
})();

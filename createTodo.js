

const { sequelize } = require('./connectDB');
const Todo = require('./TodoModel');

const createTodo = async () => {
  try {
    await sequelize.sync(); // Ensure DB connection and sync models
    const todo = await Todo.addTask({
      title: 'First Item',
      dueDate: new Date(),
      completed: false,
    });
    console.log(`Created todo with ID ${todo.id}`);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await createTodo();
})();



const { sequelize } = require('./connectDB');
const Todo = require('./TodoModel');

const updateItem = async (id) => {
  try {
    const [updatedRows] = await Todo.update(
      { completed: true },
      { where: { id: id } }
    );
    console.log(`Updated todo: ${updatedRows}`);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await updateItem(1); // Example: Update item with id = 1
})();

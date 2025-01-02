

const { sequelize } = require('./connectDB');
const Todo = require('./TodoModel');

const deleteItem = async (id) => {
  try {
    const deletedRowCount = await Todo.destroy({
      where: { id: id },
    });
    console.log(`Deleted ${deletedRowCount} rows!`);
  } catch (error) {
    console.error(error);
  }
};

(async () => {
  await deleteItem(1); // Example: Delete item with id = 1
})();

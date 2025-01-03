const express = require('express');
const router = express.Router();
const { Todo } = require('../models'); // Adjust based on your models' directory

// GET /todos - Fetch all Todos
router.get('/todos', async (req, res) => {
  try {
    const todos = await Todo.findAll(); // Sequelize method to fetch all records
    res.status(200).json(todos); // Respond with the list of Todos
  } catch (error) {
    console.error('Error fetching todos:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

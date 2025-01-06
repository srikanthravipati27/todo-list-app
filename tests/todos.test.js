const request = require('supertest');
const app = require('../app'); // Adjust based on your app's entry point
const { Todo } = require('../models');
//tetaed
describe('DELETE /todos/:id', () => {
  let todo;

  beforeAll(async () => {
    // Create a sample Todo for testing
    todo = await Todo.create({ title: 'Sample Todo', completed: false });
  });

  afterAll(async () => {
    // Clean up test data
    await Todo.destroy({ where: {}, truncate: true });
  });

  it('should delete a todo by ID and return success true', async () => {
    const response = await request(app).delete(`/todos/${todo.id}`);
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });

  it('should return success false for a non-existing ID', async () => {
    const response = await request(app).delete('/todos/9999'); // Non-existent ID
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(false);
  });
});

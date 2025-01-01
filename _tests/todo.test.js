const todoList = require("../todo");

describe("Todo List Test Suite", () => {
  let todos;

  beforeEach(() => {
    todos = todoList();
  });

  test("should add a new todo", () => {
    todos.add({ title: "New Task", dueDate: "2025-01-02", completed: false });
    expect(todos.all.length).toBe(1);
    expect(todos.all[0].title).toBe("New Task");
  });

  test("should mark a todo as completed", () => {
    todos.add({ title: "Task", dueDate: "2025-01-02", completed: false });
    todos.markAsComplete(0);
    expect(todos.all[0].completed).toBe(true);
  });

  test("should retrieve overdue items", () => {
    todos.add({ title: "Overdue Task", dueDate: "2025-01-01", completed: false });
    expect(todos.overdue().length).toBe(1);
    expect(todos.overdue()[0].title).toBe("Overdue Task");
  });

  test("should retrieve due today items", () => {
    const today = new Date().toISOString().split("T")[0];
    todos.add({ title: "Today's Task", dueDate: today, completed: false });
    expect(todos.dueToday().length).toBe(1);
    expect(todos.dueToday()[0].title).toBe("Today's Task");
  });

  test("should retrieve due later items", () => {
    todos.add({ title: "Future Task", dueDate: "2025-01-03", completed: false });
    expect(todos.dueLater().length).toBe(1);
    expect(todos.dueLater()[0].title).toBe("Future Task");
  });
});

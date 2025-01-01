const todoList = () => {
  const all = [];
  
  const add = (todoItem) => {
    all.push(todoItem);
  };

  const markAsComplete = (index) => {
    all[index].completed = true;
  };

  const overdue = () => {
    return all.filter((item) => new Date(item.dueDate) < new Date() && !item.completed);
  };

  const dueToday = () => {
    const today = new Date().toISOString().split("T")[0];
    return all.filter((item) => item.dueDate === today);
  };

  const dueLater = () => {
    return all.filter((item) => new Date(item.dueDate) > new Date());
  };

  const toDisplayableList = (list) => {
    let result = '';
    list.forEach((item) => {
      const isDueToday = item.dueDate === new Date().toISOString().split("T")[0];
      const checkbox = item.completed ? "[x]" : "[ ]";
      result += checkbox + ' ' + item.title;
      if (!isDueToday) {
        result += ' ' + item.dueDate;
      }
      result += '\n';
    });
    return result.trim();  // Remove the last new line character
  };

  return { all, add, markAsComplete, overdue, dueToday, dueLater, toDisplayableList };
};

// DO NOT CHANGE ANYTHING BELOW THIS LINE

const todos = todoList();

const formattedDate = (d) => {
  return d.toISOString().split("T")[0];
};

const dateToday = new Date();
const today = formattedDate(dateToday);
const yesterday = formattedDate(new Date(new Date().setDate(dateToday.getDate() - 1)));
const tomorrow = formattedDate(new Date(new Date().setDate(dateToday.getDate() + 1)));

todos.add({ title: "Submit assignment", dueDate: yesterday, completed: false });
todos.add({ title: "Pay rent", dueDate: today, completed: true });
todos.add({ title: "Service Vehicle", dueDate: today, completed: false });
todos.add({ title: "File taxes", dueDate: tomorrow, completed: false });
todos.add({ title: "Pay electric bill", dueDate: tomorrow, completed: false });

console.log("My Todo-list\n");

console.log("Overdue");
let overdues = todos.overdue();
let formattedOverdues = todos.toDisplayableList(overdues);
console.log(formattedOverdues);
console.log("\n");

console.log("Due Today");
let itemsDueToday = todos.dueToday();
let formattedItemsDueToday = todos.toDisplayableList(itemsDueToday);
console.log(formattedItemsDueToday);
console.log("\n");

console.log("Due Later");
let itemsDueLater = todos.dueLater();
let formattedItemsDueLater = todos.toDisplayableList(itemsDueLater);
console.log(formattedItemsDueLater);
console.log("\n");

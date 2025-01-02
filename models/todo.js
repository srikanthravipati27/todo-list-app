"use strict";

const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Todo extends Model {
    // Static method to add a new task
    static async addTask(params) {
      return await Todo.create(params);
    }

    
    static async showList() {
      console.log("My Todo list\n");

      console.log("Overdue");
      const overdueTasks = await Todo.overdue();
      overdueTasks.forEach((task) => console.log(task.displayableString()));

      console.log("\nDue Today");
      const dueTodayTasks = await Todo.dueToday();
      dueTodayTasks.forEach((task) => console.log(task.displayableString()));

      console.log("\nDue Later");
      const dueLaterTasks = await Todo.dueLater();
      dueLaterTasks.forEach((task) => console.log(task.displayableString()));

      console.log("\n");
    }


    static async overdue() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Op.lt]: new Date(), // Past due
          },
          completed: false, // Not completed
        },
      });
    }

  
    static async dueToday() {
      const today = new Date().toISOString().split("T")[0]; // Format as YYYY-MM-DD
      return await Todo.findAll({
        where: {
          dueDate: today,
          completed: false,
        },
      });
    }

    
    static async dueLater() {
      return await Todo.findAll({
        where: {
          dueDate: {
            [sequelize.Op.gt]: new Date(), // Due in the future
          },
          completed: false,
        },
      });
    }

    
    static async markAsComplete(id) {
      const task = await Todo.findByPk(id);
      if (task) {
        task.completed = true;
        await task.save();
      }
    }

    
    displayableString() {
      let checkbox = this.completed ? "[x]" : "[ ]";
      return `${this.id}. ${checkbox} ${this.title} ${this.dueDate}`;
    }

    static associate(models) {
  
    }
  }

  Todo.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dueDate: {
        type: DataTypes.DATEONLY,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    },
    {
      sequelize,
      modelName: "Todo",
    }
  );

  return Todo;
};
  

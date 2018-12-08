const mongoose = require("mongoose");
const User = mongoose.model("users");

module.exports = app => {
  app.get("/api/get_todos", (req, res) => {
    User.findOne({ _id: req.user._id }).then(user => {
      res.send(user.todos);
    });
  });

  app.post("/api/add_todo", (req, res) => {
    const todo = req.body.todo;
    User.updateOne({ _id: req.user._id }, { $push: { todos: todo } }).then(
      response => {
        res.send(todo);
      }
    );
  });

  app.delete("/api/delete_todo/", (req, res) => {
    const id = req.query.id;
    User.findOne({ _id: req.user._id }).then(user => {
      const todos = user.todos;
      const newTodos = [
        ...todos.slice(0, id),
        ...todos.slice(id + 1, todos.length)
      ];
      User.updateOne({ _id: req.user._id }, { $set: { todos: newTodos } }).then(
        response => {
          res.send(user.todos);
        }
      );
    });
  });
  app.put("/api/edit_todo/:id", (req, res) => {
    const updateTodo = req.body.todo;
    User.findOne({ _id: req.user._id }).then(user => {
      const todos = user.todos;
      const newTodos = [
        ...todos.slice(0, req.params.id),
        updateTodo,
        ...todos.slice(req.params.id + 1, todos.length)
      ];
      User.updateOne({ _id: req.user._id }, { $set: { todos: newTodos } }).then(
        response => {
          res.send(user.todos);
        }
      );
    });
  });
};

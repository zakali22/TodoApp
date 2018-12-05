import React, { Component } from "react";
import Form from "./Form";
import List from "./List";
import moment from "moment";

class App extends Component {
  state = {
    todos: [],
    completed: [],
    time: null
  };
  onSubmitHandler = value => {
    const todos = [...this.state.todos];
    const todo = {
      createdAt: moment().calendar(),
      title: value
    };
    this.setState({
      todos: todos.concat(todo)
    });
  };

  onDeleteHandler = id => {
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== id)
    });
  };

  onDeleteCompleteHandler = id => {
    this.setState({
      completed: this.state.completed.filter((todo, i) => i !== id)
    });
  };

  onEditHandler = (index, value) => {
    const todos = this.state.todos;
    const indexEditAt = this.state.todos.find((todo, i) => i === index);
    const newTodo = {
      ...indexEditAt,
      title: value
    };
    this.setState({
      todos: [
        ...todos.slice(0, index),
        newTodo,
        ...todos.slice(index + 1, todos.length)
      ]
    });
  };

  onCompletionHandler = id => {
    const indexCompleteAt = this.state.todos.find((todo, i) => i === id);
    const completedTodos = [...this.state.completed];
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== id),
      completed: completedTodos.concat(indexCompleteAt)
    });
  };

  liveClockInterval = () => {
    setInterval(() => {
      this.setState({
        time: moment().format("LTS")
      });
    }, 1000);
  };

  componentDidMount() {
    this.liveClockInterval();
  }

  render() {
    return (
      <div className="main">
        <div className="main__container">
          <div className="main__welcome">
            <h2>Good Morning, Zack</h2>
            <span className="main__welcome--time">
              <p>Its {moment().format("MMMM Do YYYY")}</p>
              <p>{this.state.time}</p>
            </span>
          </div>
          <div className="main__todo">
            <Form onSubmit={this.onSubmitHandler} />
            {this.state.completed.length > 0 ? (
              <List
                todos={this.state.todos}
                completedTodos={this.state.completed}
                onDeleteComplete={this.onDeleteCompleteHandler}
                onDelete={this.onDeleteHandler}
                onEditHandler={this.onEditHandler}
                addToComplete={this.onCompletionHandler}
              />
            ) : (
              <List
                todos={this.state.todos}
                onDelete={this.onDeleteHandler}
                onEditHandler={this.onEditHandler}
                addToComplete={this.onCompletionHandler}
              />
            )}
          </div>
        </div>
      </div>
    );
  }
}

export default App;

import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import List from "./List";
import moment from "moment";

class App extends Component {
  state = {
    todos: []
  };
  onSubmitHandler = value => {
    const todos = [...this.state.todos];
    const todo = {
      createdAt: moment().format("MMM Do YY"),
      title: value
    };
    this.setState({
      todos: todos.concat(todo)
    });
  };

  render() {
    return (
      <div className="main">
        <div className="main__container">
          <List todos={this.state.todos} />
          <Form onSubmit={this.onSubmitHandler} />
        </div>
      </div>
    );
  }
}

export default App;

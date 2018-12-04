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
      createdAt: moment().calendar(),
      title: value
    };
    this.setState({
      todos: todos.concat(todo)
    });
  };

  onDeleteHandler = id => {
    const index = id;
    this.setState({
      todos: this.state.todos.filter((todo, i) => i !== id)
    });
  };

  render() {
    return (
      <div className="main">
        <div className="main__container">
          <div className="main__welcome">
            <h2>Good Morning, Zack</h2>
            <span className="main__welcome--time">
              <p>Its Friday, September 21, 2018</p>
              <p>12:45am</p>
            </span>
          </div>
          <div className="main__todo">
            <Form onSubmit={this.onSubmitHandler} />
            <List todos={this.state.todos} onDelete={this.onDeleteHandler} />
          </div>
        </div>
      </div>
    );
  }
}

export default App;

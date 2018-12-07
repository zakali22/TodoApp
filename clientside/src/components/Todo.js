import React, { Component, Fragment } from "react";
import Form from "./Form";
import List from "./List";
import LoadTime from "./LoadTime";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import * as actions from "../actions/authActions";

class Todo extends Component {
  state = {
    todos: [],
    completed: []
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

  componentDidMount() {
    this.props.fetchUser();
  }

  renderOnUser = () => {
    const auth = this.props.auth;
    console.log(auth);
    if (auth) {
      return (
        <div className="main">
          <div className="main__container">
            <div className="main__welcome">
              <h2>Good Morning, {auth.name}</h2>
              <LoadTime />
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
  };

  render() {
    return <Fragment>{this.renderOnUser()}</Fragment>;
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  actions
)(Todo);

import React, { Component, Fragment } from "react";
import Form from "./Form";
import List from "./List";
import LoadTime from "./LoadTime";
import Greeting from "./Greeting";
import moment from "moment";
import axios from "axios";
import { connect } from "react-redux";
import { fetchUser } from "../actions/authActions";
import {
  add_todo,
  edit_todo,
  delete_todo,
  get_todos
} from "../actions/todoActions";
import { delete_complete, complete_todo } from "../actions/completionActions";

const actions = {
  fetchUser,
  add_todo,
  edit_todo,
  delete_todo,
  get_todos,
  delete_complete,
  complete_todo
};

class Todo extends Component {
  state = {
    todos: this.props.todos,
    complete: this.props.complete
  };
  onSubmitHandler = value => {
    const todos = [...this.props.todos];
    const todo = {
      createdAt: moment().calendar(),
      title: value
    };
    this.props.add_todo(todo);
  };

  onDeleteHandler = id => {
    this.props.delete_todo(id);
  };

  onDeleteCompleteHandler = id => {
    this.props.delete_complete(id);
  };

  onEditHandler = (index, value) => {
    console.log(index);
    const indexEditAt = this.props.todos.find((todo, i) => i === index);
    const newTodo = {
      ...indexEditAt,
      title: value
    };
    this.props.edit_todo(index, newTodo);
  };

  onCompletionHandler = id => {
    const completedTodo = this.props.todos.find((todo, i) => i === id);
    const completedTodos = [...this.props.complete];
    this.props.complete_todo(id, completedTodo);
  };

  componentDidMount() {
    this.props.fetchUser();
    this.props.get_todos();
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      todos: nextProps.todos,
      complete: nextProps.complete
    });
  }

  renderOnUser = () => {
    const { auth, todos, complete } = this.props;
    if (auth) {
      return (
        <div className="main">
          <div className="main__container">
            <div className="main__welcome">
              <Greeting name={auth.name} />
              <LoadTime />
            </div>
            <div className="main__todo">
              <Form onSubmit={this.onSubmitHandler} />
              {complete.length > 0 ? (
                <List
                  todos={todos}
                  completedTodos={complete}
                  onDeleteComplete={this.onDeleteCompleteHandler}
                  onDelete={this.onDeleteHandler}
                  onEditHandler={this.onEditHandler}
                  addToComplete={this.onCompletionHandler}
                />
              ) : (
                <List
                  todos={todos}
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
    auth: state.auth,
    todos: state.todos,
    complete: state.complete
  };
};

export default connect(
  mapStateToProps,
  actions
)(Todo);

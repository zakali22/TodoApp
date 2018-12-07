import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import EditForm from "./EditForm";
import ListItem from "./ListItem";
import ListItemComplete from "./ListItemComplete";

class List extends Component {
  static propTypes = {
    todos: PropTypes.arrayOf(
      PropTypes.shape({
        createdAt: PropTypes.string,
        title: PropTypes.string
      })
    ).isRequired,
    completedTodos: PropTypes.arrayOf(
      PropTypes.shape({
        createdAt: PropTypes.string,
        title: PropTypes.string
      })
    ),
    onDeleteComplete: PropTypes.func,
    onDelete: PropTypes.func.isRequired,
    onEditHandler: PropTypes.func.isRequired,
    addToComplete: PropTypes.func.isRequired
  };
  state = {
    isEditing: false,
    editId: 0
  };
  onDelete = id => {
    this.props.onDelete(id);
  };
  onDeleteComplete = id => {
    this.props.onDeleteComplete(id);
  };
  onEdit = id => {
    console.log(id);
    this.setState({
      isEditing: !this.state.isEditing,
      editId: id
    });
  };

  onEditHandler = (index, value) => {
    this.props.onEditHandler(index, value);
    this.setState({
      isEditing: false
    });
  };

  addToComplete = id => {
    this.props.addToComplete(id);
  };

  render() {
    console.log(this.props.todos);
    const completedList = this.props.completedTodos
      ? this.props.completedTodos.map((todo, i) => {
          return (
            <ListItemComplete
              key={i}
              id={i}
              todo={todo}
              onDeleteComplete={this.onDeleteComplete.bind(this, i)}
            />
          );
        })
      : null;
    const lists = this.props.todos.map((todo, i) => {
      return (
        <Fragment key={i}>
          {this.state.isEditing ? (
            this.state.editId === i ? (
              <EditForm
                value={todo.title}
                onSubmit={this.onEditHandler.bind(this, i)}
              />
            ) : (
              <ListItem
                todo={todo}
                onEdit={this.onEdit.bind(this, i)}
                id={i}
                onDelete={this.onDelete.bind(this, i)}
                addToComplete={this.addToComplete.bind(this, i)}
              />
            )
          ) : (
            <ListItem
              todo={todo}
              onEdit={this.onEdit.bind(this, i)}
              id={i}
              onDelete={this.onDelete.bind(this, i)}
              addToComplete={this.addToComplete.bind(this, i)}
            />
          )}
        </Fragment>
      );
    });
    return (
      <div className="list">
        <div className="list__created">
          <h3>Today's focal points</h3>
          <ul>{lists}</ul>
        </div>
        <div className="list__completed">
          <h3>Completed</h3>
          <ul>{completedList}</ul>
        </div>
      </div>
    );
  }
}

export default List;

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import EditForm from "./EditForm";
import ListItem from "./ListItem";
import ListItemComplete from "./ListItemComplete";

class List extends Component {
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
    const completedList = this.props.completedTodos
      ? this.props.completedTodos.map((todo, i) => {
          return (
            <ListItemComplete
              id={i}
              todo={todo}
              onDeleteComplete={this.onDeleteComplete}
            />
          );
        })
      : null;
    const lists = this.props.todos.map((todo, i) => {
      return (
        <Fragment>
          {this.state.isEditing ? (
            this.state.editId === i ? (
              <EditForm
                value={todo.title}
                onSubmit={this.onEditHandler.bind(this, i)}
              />
            ) : (
              <ListItem
                todo={todo}
                onEdit={this.onEdit}
                id={i}
                onDelete={this.onDelete}
                addToComplete={this.addToComplete}
              />
            )
          ) : (
            <ListItem
              todo={todo}
              onEdit={this.onEdit}
              id={i}
              onDelete={this.onDelete}
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

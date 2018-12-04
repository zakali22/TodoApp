import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import EditForm from "./EditForm";

class List extends Component {
  state = {
    isEditing: false,
    editId: 0
  };
  onDelete = id => {
    this.props.onDelete(id);
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

  render() {
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
              <li className="list__created--item" key={i}>
                <h4>{todo.title}</h4>
                <i
                  class="far fa-edit list__created--item_edit"
                  onClick={this.onEdit.bind(this, i)}
                />
                <input type="radio" id={i} className="radio_input" />
                <label htmlFor={i}>
                  <span />
                </label>
                <span
                  className="list__created--item_delete"
                  onClick={this.onDelete.bind(this, i)}
                >
                  &#10005;
                </span>
              </li>
            )
          ) : (
            <li className="list__created--item" key={i}>
              <h4>{todo.title}</h4>
              <i
                class="far fa-edit list__created--item_edit"
                onClick={this.onEdit.bind(this, i)}
              />
              <input type="radio" id={i} className="radio_input" />
              <label htmlFor={i}>
                <span />
              </label>
              <span
                className="list__created--item_delete"
                onClick={this.onDelete.bind(this, i)}
              >
                &#10005;
              </span>
            </li>
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
        </div>
      </div>
    );
  }
}

export default List;

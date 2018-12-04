import React, { Component } from "react";
import PropTypes from "prop-types";

class List extends Component {
  onDelete = id => {
    this.props.onDelete(id);
  };
  render() {
    const lists = this.props.todos.map((todo, i) => {
      return (
        <li className="list__created--item" key={i}>
          <h4>{todo.title}</h4>
          <input type="radio" id={i} />
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

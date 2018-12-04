import React, { Component } from "react";
import PropTypes from "prop-types";

class List extends Component {
  render() {
    const lists = this.props.todos.map((todo, i) => {
      return (
        <li className="list__item" key={i}>
          <div className="list__item--left">
            <h4>{todo.title}</h4>
            <p>{todo.createdAt}</p>
          </div>
          <span>&times;</span>
        </li>
      );
    });
    return (
      <div className="list">
        <ul>{lists}</ul>
      </div>
    );
  }
}

export default List;

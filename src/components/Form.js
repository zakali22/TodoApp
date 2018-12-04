import React, { Component } from "react";
import PropTypes from "prop-types";

class Form extends Component {
  state = {
    value: ""
  };

  onChange = evt => {
    const value = evt.target.value;
    this.setState({
      value
    });
  };

  render() {
    return (
      <div className="form">
        <form>
          <input
            id="add_todo"
            className="form__input"
            value={this.state.value}
            onChange={this.onChange}
            placeholder="Add a todo"
          />
          <label className="form__label" htmlFor="add_todo">
            Add a todo
          </label>
          <button className="form__button">Add</button>
        </form>
      </div>
    );
  }
}

export default Form;

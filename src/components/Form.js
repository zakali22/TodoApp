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
          <label htmlFor="add_todo">Add a todo</label>
          <input
            id="add_todo"
            className="form_input"
            value={this.state.value}
            onChange={this.onChange}
            placeholder="Add a todo"
          />
          <button className="form_button">Add todo</button>
        </form>
      </div>
    );
  }
}

export default Form;

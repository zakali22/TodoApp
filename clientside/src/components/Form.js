import React, { Component } from "react";
import PropTypes from "prop-types";

class Form extends Component {
  static propTypes = {
    onSubmit: PropTypes.func.isRequired
  };
  state = {
    value: ""
  };

  onChange = evt => {
    const value = evt.target.value;
    this.setState({
      value
    });
  };

  onSubmit = evt => {
    evt.preventDefault();
    if (this.state.value) {
      this.props.onSubmit(this.state.value);
      this.setState({
        value: ""
      });
    }
  };

  render() {
    return (
      <div className="form">
        <form onSubmit={this.onSubmit}>
          <input
            id="add_todo"
            className="form__input"
            value={this.state.value}
            onChange={this.onChange}
            placeholder="Add a todo"
          />
          <button onClick={this.onSubmit} className="form__button">
            &#43;
          </button>
        </form>
      </div>
    );
  }
}

export default Form;

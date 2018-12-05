import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";

const formStyle = {
  display: "flex",
  alignItems: "center",
  marginTop: "0.5rem"
};
const inputStyle = {
  color: "white"
};

class EditForm extends Component {
  static propTypes = {
    value: PropTypes.string.isRequired,
    onSubmit: PropTypes.func.isRequired
  };
  state = {
    value: this.props.value
  };
  onChange = evt => {
    const value = evt.target.value;
    this.setState({
      value
    });
  };

  onSubmit = evt => {
    evt.preventDefault();
    this.props.onSubmit(this.state.value);
  };
  render() {
    return (
      <Fragment>
        <form onSubmit={this.onSubmit} style={formStyle}>
          <input
            id="add_todo"
            className="form__input"
            value={this.state.value}
            onChange={this.onChange}
            style={inputStyle}
          />
          <button
            onClick={this.onSubmit}
            className="form__button"
            style={{ fontSize: "1.5rem" }}
          >
            <i class="far fa-check-circle" />
          </button>
        </form>
      </Fragment>
    );
  }
}

export default EditForm;

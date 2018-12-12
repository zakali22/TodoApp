import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";

const errorStyle = {
  borderBottom: "1px solid red"
};

const style = {
  borderBottom: "1px solid green"
};

class FormUserPasswords extends Component {
  state = {
    password: "",
    confirm_password: "",
    matched: false,
    password_length: false,
    errors: []
  };

  onChange = e => {
    const { password, confirm_password } = this.state;

    if (e.target.value.length >= 5) {
      this.setState({
        password_length: true
      });
      if (password.trim() === e.target.value) {
        this.setState({
          matched: true
        });
      } else {
        this.setState({
          matched: false
        });
      }
    } else {
      this.setState({
        password_length: false
      });
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  continue = e => {
    const { password, confirm_password } = this.state;
    const { first_name, last_name, email } = this.props.values;
    e.preventDefault();
    axios
      .post("/auth/addUser", {
        first_name,
        last_name,
        email,
        password,
        confirm_password
      })
      .then(response => {
        if (response.data.success) {
          this.props.nextStep();
        } else {
          console.log(response.data);
          this.setState({
            errors: response.data.error
          });
        }
      });
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, onChange } = this.props;
    const { matched, password_length } = this.state;
    const errorLists =
      this.state.errors.length > 0
        ? this.state.errors.map((error, i) => {
            return (
              <li key={i} className="error-list--item">
                {error.msg}
              </li>
            );
          })
        : [];
    return (
      <Fragment>
        <ul
          className="error-list"
          style={{ display: errorLists.length === 0 ? "none" : "block" }}
        >
          {errorLists}
        </ul>
        <form className="getstarted__local--form">
          <input
            type="password"
            style={password_length ? style : errorStyle}
            value={values.password}
            placeholder="Password"
            name="password"
            onChange={this.onChange}
          />
          <input
            type="password"
            style={matched ? style : errorStyle}
            value={values.confirm_password}
            placeholder="Confirm password"
            name="confirm_password"
            onChange={this.onChange}
          />

          <button onClick={this.back}>Back</button>
          <button onClick={this.continue}>Next</button>
        </form>
      </Fragment>
    );
  }
}

export default FormUserPasswords;

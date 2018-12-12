import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";
import { Redirect } from "react-router-dom";

class FormSignin extends Component {
  state = {
    email: "",
    password: "",
    errors: []
  };
  continue = e => {
    e.preventDefault();
    const { email, password } = this.state;
    console.log(email, password);
    axios.post("/auth/logUser", { email, password }).then(response => {
      if (response.data.success) {
        console.log(response.data);
        this.props.history.push("/todo");
      } else {
        console.log(response.data);
        this.setState({
          errors: response.data
        });
      }
    });
  };

  onChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    const { email, password } = this.state;
    const errorLists =
      this.state.errors.length > 0
        ? this.state.errors.map((error, i) => {
            return (
              <li key={i} className="error-list--item">
                {error.message}
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
            value={email}
            placeholder="Email"
            name="email"
            onChange={this.onChange}
            type="text"
          />
          <input
            value={password}
            placeholder="Password"
            name="password"
            onChange={this.onChange}
            type="password"
          />

          <button onClick={this.continue}>Next</button>
        </form>
      </Fragment>
    );
  }
}

export default FormSignin;

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import axios from "axios";

class FormUserDetails extends Component {
  state = {
    errors: []
  };
  continue = e => {
    e.preventDefault();
    const { first_name, last_name, email } = this.props.values;
    console.log(first_name, last_name, email);
    axios
      .post("/auth/checkPersonal", { first_name, last_name, email })
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

  render() {
    const { values, onChange } = this.props;
    const errorLists =
      this.state.errors.length > 0
        ? this.state.errors.map((error, i) => {
            return (
              <li key={i} className="error-list--item">
                {error.msg}
              </li>
            );
          })
        : null;
    return (
      <Fragment>
        <ul className="error-list">{errorLists}</ul>
        <form className="getstarted__local--form">
          <input
            value={values.first_name}
            placeholder="First name"
            name="first_name"
            onChange={onChange("first_name")}
          />
          <input
            value={values.last_name}
            placeholder="Last name"
            name="last_name"
            onChange={onChange("last_name")}
          />
          <input
            value={values.email}
            placeholder="Email"
            name="email"
            onChange={onChange("email")}
          />
          <button onClick={this.continue}>Next</button>
        </form>
      </Fragment>
    );
  }
}

export default FormUserDetails;

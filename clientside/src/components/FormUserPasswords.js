import React from "react";
import PropTypes from "prop-types";

class FormUserPasswords extends React.Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  back = e => {
    e.preventDefault();
    this.props.prevStep();
  };

  render() {
    const { values, onChange } = this.props;
    return (
      <form className="getstarted__local--form">
        <input
          value={values.password}
          placeholder="Password"
          name="password"
          onChange={onChange("password")}
        />
        <input
          value={values.confirm_password}
          placeholder="Confirm password"
          name="confirm_password"
          onChange={onChange("confirm_password")}
        />

        <button onClick={this.back}>Back</button>
        <button onClick={this.continue}>Next</button>
      </form>
    );
  }
}

export default FormUserPasswords;

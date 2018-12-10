import React from "react";
import PropTypes from "prop-types";

class FormUserDetails extends React.Component {
  continue = e => {
    e.preventDefault();
    this.props.nextStep();
  };

  render() {
    const { values, onChange } = this.props;
    return (
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
    );
  }
}

export default FormUserDetails;

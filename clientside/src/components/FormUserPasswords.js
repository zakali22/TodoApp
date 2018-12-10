import React from "react";
import PropTypes from "prop-types";

const errorStyle = {
  borderBottom: "1px solid red"
};

const style = {
  borderBottom: "1px solid #4385f5"
};

class FormUserPasswords extends React.Component {
  state = {
    password: "",
    confirm_password: "",
    matched: false
  };

  onChange = e => {
    const { password, confirm_password } = this.state;
    if (password.trim() === e.target.value) {
      this.setState({
        matched: true
      });
    } else {
      this.setState({
        matched: false
      });
    }
    this.setState({
      [e.target.name]: e.target.value
    });
  };

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
    const { matched } = this.state;
    return (
      <form className="getstarted__local--form">
        <input
          type="password"
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
    );
  }
}

export default FormUserPasswords;

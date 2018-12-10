import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link, Redirect } from "react-router-dom";
import Google from "../Google.png";
import FormUserDetails from "./FormUserDetails";
import FormUserPasswords from "./FormUserPasswords";

class Register extends Component {
  state = {
    step: 1,
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    confirm_password: ""
  };

  nextStep = () => {
    this.setState({
      step: this.state.step + 1
    });
  };

  prevStep = () => {
    this.setState({
      step: this.state.step - 1
    });
  };

  onChange = value => e => {
    this.setState({
      [value]: e.target.value
    });
  };

  renderForm = () => {
    const { first_name, last_name, email, password } = this.state;
    const values = { first_name, last_name, email, password };
    switch (this.state.step) {
      case 1:
        return (
          <FormUserDetails
            values={values}
            onChange={this.onChange}
            nextStep={this.nextStep}
          />
        );
        break;
      case 2:
        return (
          <FormUserPasswords
            values={values}
            onChange={this.onChange}
            nextStep={this.nextStep}
            prevStep={this.prevStep}
          />
        );
        break;
      case 3:
        return <Redirect to={"/todo"} />;
    }
  };

  render() {
    return (
      <div className="getstarted">
        <div className="container">
          <h1>Sign in</h1>
          <div className="container__register">
            <div className="getstarted__social">
              <a
                href="http://localhost:5000/auth/facebook"
                className="getstarted__social--facebook"
              >
                <button>
                  <i className="fab fa-facebook" />
                  <p>Continue with Facebook</p>
                </button>
              </a>
              <a
                href="http://localhost:5000/auth/google"
                className="getstarted__social--google"
              >
                <button>
                  <img src={Google} />
                  <p>Continue with Google</p>
                </button>
              </a>
            </div>
            <div className="getstarted__local">
              <div className="container">{this.renderForm()}</div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Register;

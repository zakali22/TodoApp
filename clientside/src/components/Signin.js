import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Google from "../Google.png";
import FormSignin from "./FormSignin";

class Signin extends Component {
  render() {
    console.log(this.props);
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
            <p id="divider">or</p>
            <div className="getstarted__local">
              <div className="container">
                <FormSignin history={this.props.history} />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Signin;

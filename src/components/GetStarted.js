import React from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import Google from "../Google.png";

const GetStarted = props => {
  return (
    <div className="getstarted">
      <div className="container">
        <h1>Sign in</h1>
        <div className="container__register">
          <div className="getstarted__social">
            <a className="getstarted__social--facebook">
              <button>
                <i class="fab fa-facebook" />
                <p>Continue with Facebook</p>
              </button>
            </a>
            <a className="getstarted__social--google">
              <button>
                <img src={Google} />
                <p>Continue with Google</p>
              </button>
            </a>
          </div>
          <div className="getstarted__local">
            <h1>Local signing </h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetStarted;

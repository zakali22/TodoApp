import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="container">
          <div className="homepage__welcome">
            <h1>
              Organize your tasks with simple <span>todos</span>
            </h1>
            <p>
              No more fancy and hard to navigate UI's. <span>Just todo it</span>
              .
            </p>
          </div>
          <div className="homepage__register">
            <Link to="/register">
              <button>Get started</button>
            </Link>
          </div>
        </div>
      </div>
    );
  }
}

export default Homepage;

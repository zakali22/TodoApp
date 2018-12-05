import React, { Component } from "react";
import PropTypes from "prop-types";

class Homepage extends Component {
  render() {
    return (
      <div className="homepage">
        <div className="homepage__welcome">
          <h1>Organize your tasks with simple todos</h1>
          <p>No more fancy and hard to navigate UI's</p>
        </div>
        <div className="homepage__register">
          <button>Get started</button>
        </div>
      </div>
    );
  }
}

export default Homepage;

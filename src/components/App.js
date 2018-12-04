import React, { Component } from "react";
import PropTypes from "prop-types";
import Form from "./Form";
import List from "./List";

class App extends Component {
  render() {
    return (
      <div className="main">
        <div className="main__container">
          <List />
          <Form />
        </div>
      </div>
    );
  }
}

export default App;

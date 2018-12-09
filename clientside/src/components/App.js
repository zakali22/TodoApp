import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Homepage from "./Homepage";
import Header from "./Header";
import Todo from "./Todo";
import GetStarted from "./GetStarted";

const App = props => {
  return (
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <Route exact path="/todo" component={Todo} />
          <Route exact path="/get-started" component={GetStarted} />
          <Route exact path="/" component={Homepage} />
        </Switch>
      </Fragment>
    </Router>
  );
};

export default App;

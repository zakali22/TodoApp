import React, { Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import PropTypes from "prop-types";
import Homepage from "./Homepage";
import Header from "./Header";
import Todo from "./Todo";
import Signin from "./Signin";
import Register from "./Register";
import NotFound from "./NotFound";
import { connect } from "react-redux";
import PropsRoute from "./routeHelper";

const App = props => {
  return (
    <Router>
      <Fragment>
        <Header />
        <Switch>
          <PropsRoute exact path="/todo" component={Todo} />
          <PropsRoute exact path="/signin" component={Signin} />
          <PropsRoute exact path="/register" component={Register} />
          <PropsRoute exact path="/" component={Homepage} auth={props.auth} />
          <PropsRoute component={NotFound} />
        </Switch>
      </Fragment>
    </Router>
  );
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(App);

import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderHeader = () => {
    if (this.props.auth) {
      return <button>Logout</button>;
    } else {
      return (
        <Fragment>
          <button className="signup">Signup</button>
          <button className="login">Login</button>
        </Fragment>
      );
    }
  };
  render() {
    return (
      <div className="header">
        <div className="container">
          <div className="header__nav">
            <Link to={"/"} className="header__nav--left">
              <p>Home</p>
            </Link>
            <div className="header__nav--right">{this.renderHeader()}</div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  null
)(Header);
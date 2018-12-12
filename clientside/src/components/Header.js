import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

class Header extends Component {
  renderHeader = () => {
    if (this.props.auth) {
      return (
        <button>
          <a href="/auth/logout">Logout</a>
        </button>
      );
    } else {
      return (
        <Fragment>
          <Link className="signup" to={"/register"}>
            <button>Signup</button>
          </Link>
          <Link to={"/signin"} className="login">
            <button>Login</button>
          </Link>
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

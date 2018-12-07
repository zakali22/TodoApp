import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class LoadTime extends Component {
  state = {
    time: null
  };
  liveClockInterval = () => {
    setInterval(() => {
      this.setState({
        time: moment().format("LTS")
      });
    }, 1000);
  };
  componentDidMount() {
    console.log(this.state.time);
    this.liveClockInterval();
  }
  render() {
    return (
      <Fragment>
        <span className="main__welcome--time">
          <p>Its {moment().format("MMMM Do YYYY")}</p>
          <p>{this.state.time}</p>
        </span>
      </Fragment>
    );
  }
}

export default LoadTime;

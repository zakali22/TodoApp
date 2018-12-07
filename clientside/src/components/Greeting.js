import React, { Component, Fragment } from "react";
import PropTypes from "prop-types";
import moment from "moment";

class Greeting extends Component {
  state = {
    hour: null
  };
  shouldComponentUpdate(nextProps, nextState) {
    return this.state.hour === nextState ? false : true;
  }
  componentWillMount() {
    this.setState({
      hour: moment().hour()
    });
  }
  greeting = () => {
    const hour = this.state.hour;
    if (hour >= 1 && hour < 12) {
      return "Morning";
    } else if (hour >= 12 && hour < 18) {
      return "Evening";
    } else {
      return "Night";
    }
  };
  render() {
    return (
      <Fragment>
        <h2>
          Good {this.greeting()}, {this.props.name}
        </h2>
      </Fragment>
    );
  }
}

export default Greeting;

import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import { connect } from "react-redux";

class Home extends Component {
  render() {
    const { isLoggedIn, userInfo } = this.props;
    console.log(userInfo);
    let linkToRedirect = isLoggedIn ? "/system/user-manage" : "/home";

    if (userInfo?.roleId === "R3") {
      linkToRedirect = isLoggedIn ? "/doctor/manage-user" : "/home";
    }

    if (userInfo?.roleId === "R2") {
      linkToRedirect = isLoggedIn ? "/doctor/manage-patient" : "/home";
    }

    if (userInfo?.roleId === "R3") {
      linkToRedirect = isLoggedIn ? "/doctor/manage-patient" : "/home";
    }
    return <Redirect to={linkToRedirect} />;
  }
}

const mapStateToProps = (state) => {
  return {
    isLoggedIn: state.user.isLoggedIn,
    userInfo: state.user.userInfo,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);

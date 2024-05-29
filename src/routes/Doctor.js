import React, { Component } from "react";
import { connect } from "react-redux";
import { Route, Switch } from "react-router-dom";
import Header from "../containers/Header/Header";
import ManagePatient from "../containers/System/Doctor/ManagePatient";
import ManageSchedule from "../containers/System/Doctor/ManageSchedule";
import ManageInfo from "../containers/System/Doctor/ManageInfo";
import ManageDetailInfo from "../containers/System/Doctor/ManageDetailInfo";
class Doctor extends Component {
  render() {
    const { isLoggedIn } = this.props;

    return (
      <React.Fragment>
        {isLoggedIn && <Header />}
        <div className="system-container">
          <div className="system-list">
            <Switch>
              <Route
                path="/doctor/manage-schedule"
                component={ManageSchedule}
              />

              <Route path="/doctor/manage-patient" component={ManagePatient} />
              <Route path="/doctor/manage-info" component={ManageInfo} />
              <Route
                path="/doctor/manage-detail-info"
                component={ManageDetailInfo}
              />
            </Switch>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    systemMenuPath: state.app.systemMenuPath,
    isLoggedIn: state.user.isLoggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Doctor);

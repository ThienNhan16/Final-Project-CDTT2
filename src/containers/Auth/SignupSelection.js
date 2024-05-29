import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "./Login.scss";
import { handleLoginApi } from "../../services/userService";

class SignupSelection extends Component {
  constructor(props) {
    super(props);
    this.btnLogin = React.createRef();
    this.state = {
      username: "",
      password: "",
      isShowPassword: false,
      errMessage: "",
    };
  }

  handleOnChangeUsername = (event) => {
    this.setState({
      username: event.target.value,
    });
  };

  handleOnChangePassword = (event) => {
    this.setState({
      password: event.target.value,
    });
  };

  redirectToPage = (url) => {
    const { navigate } = this.props;
    const redirectPath = `/${url}`;
    navigate(`${redirectPath}`);
  };

  handleLogin = async () => {
    this.setState({ errMessage: "" });
    try {
      let data = await handleLoginApi(this.state.username, this.state.password);

      if (data && data.errCode !== 0) {
        this.setState({ errMessage: data.message });
      }
      if (data && data.errCode === 0) {
        this.props.userLoginSuccess(data.user);
      }
    } catch (error) {
      if (error.respond) {
        if (error.respond.data) {
          this.setState({ errMessage: error.respond.data.message });
        }
      }
    }
  };

  handleShowHidePassword = () => {
    this.setState({
      isShowPassword: !this.state.isShowPassword,
    });
  };

  handleKeyDown = (event) => {
    if (event.key === "Enter" || event.keyCode === 13) {
      this.handleLogin();
    }
  };

  render() {
    return (
      <div className="login-background">
        <div className="login-container" style={{ height: "200px" }}>
          <div className="login-content row">
            <div className="col-12  text-login">Đăng ký</div>

            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.redirectToPage("signupdoctor");
                }}
              >
                Đăng ký tài khoản bác sĩ
              </button>
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.redirectToPage("signuppatient");
                }}
              >
                Đăng ký tài khoản bệnh nhân
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    //  userLoginFail: () => dispatch(actions.adminLoginFail()),
    userLoginSuccess: (userInfor) =>
      dispatch(actions.userLoginSuccess(userInfor)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupSelection);

import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "../../../src/containers/System/UserManage.scss";
import "react-image-lightbox/style.css";
import "./Login.scss";

class SignupPatient extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
    };
  }

  redirectToPage = (url) => {
    const { navigate } = this.props;
    const redirectPath = `/${url}`;
    navigate(`${redirectPath}`);
  };

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {}

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;
    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      roleId: "R3",
      address: null,
      gender: null,
      positionId: null,
      avatar: null,
    });
  };

  checkValidateInput = () => {
    let isValid = true;
    let arrCheck = [
      "email",
      "password",
      "firstName",
      "lastName",
      "phoneNumber",
    ];

    for (let i = 0; i < arrCheck.length; i++) {
      if (!this.state[arrCheck[i]]) {
        isValid = false;
        alert("This in put is required: " + arrCheck[i]);
        break;
      }
    }

    return isValid;
  };

  onChangeInput = (event, id) => {
    let copyState = { ...this.state };
    copyState[id] = event.target.value;
    this.setState({ ...copyState });
  };

  render() {
    let { email, password, firstName, lastName, phoneNumber } = this.state;

    return (
      <div className="login-background">
        <div className="login-container" style={{ height: "600px" }}>
          <div className="login-content row">
            <div className="col-12  text-login">Tạo tài khoản bệnh nhân</div>

            <div className="col-12 form-group login-input">
              <label>Email:</label>
              <input
                type="text"
                className="form-control"
                placeholder="Nhập email"
                value={email}
                onChange={(event) => this.onChangeInput(event, "email")}
              />
            </div>

            <div className="col-12 form-group  login-input">
              <label>Mật khẩu:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  value={password}
                  type={"password"}
                  placeholder="Nhập mật khẩu"
                  onChange={(event) => this.onChangeInput(event, "password")}
                />
              </div>
            </div>

            <div className="col-12 form-group  login-input">
              <label>Họ:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nhập họ"
                  value={firstName}
                  onChange={(event) => this.onChangeInput(event, "firstName")}
                />
              </div>
            </div>

            <div className="col-12 form-group  login-input">
              <label>Tên:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nhập tên"
                  value={lastName}
                  onChange={(event) => this.onChangeInput(event, "lastName")}
                />
              </div>
            </div>

            <div className="col-12 form-group  login-input">
              <label>SĐT:</label>
              <div className="custom-input-password">
                <input
                  className="form-control"
                  type="text"
                  placeholder="Nhập SĐT"
                  value={phoneNumber}
                  onChange={(event) => this.onChangeInput(event, "phoneNumber")}
                />
              </div>
            </div>

            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.handleSaveUser();
                }}
              >
                Đăng ký
              </button>
            </div>
            <div className="col-12">
              <button
                className="btn-login"
                onClick={() => {
                  this.redirectToPage("login");
                }}
              >
                Đăng nhập
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
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupPatient);

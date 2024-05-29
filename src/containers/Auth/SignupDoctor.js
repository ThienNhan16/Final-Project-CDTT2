import React, { Component } from "react";
import { connect } from "react-redux";
import { push } from "connected-react-router";
import * as actions from "../../store/actions";
import "../../../src/containers/System/UserManage.scss";
import "react-image-lightbox/style.css";
import "./Login.scss";
import { CommonUtils } from "../../utils";

class SignupDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      genderArr: [],
      positionArr: [],
      roleArr: [],
      previewImgURL: "",
      isOpen: false,
      email: "",
      password: "",
      firstName: "",
      lastName: "",
      phoneNumber: "",
      address: "",
      gender: "",
      position: "",
      role: "",
      avatar: "",
    };
  }

  redirectToPage = (url) => {
    const { navigate } = this.props;
    const redirectPath = `/${url}`;
    navigate(`${redirectPath}`);
  };

  async componentDidMount() {
    this.props.getGenderStart();
    this.props.getPositionStart();
    this.props.getRoleStart();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.positionRedux !== this.props.positionRedux) {
      let arrPositions = this.props.positionRedux;
      this.setState({
        positionArr: arrPositions,
        position:
          arrPositions && arrPositions.length > 0 ? arrPositions[0].keyMap : "",
      });
    }
  }

  handleOnchangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        avatar: base64,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleSaveUser = () => {
    let isValid = this.checkValidateInput();
    if (isValid === false) return;

    this.props.createNewUser({
      email: this.state.email,
      password: this.state.password,
      firstName: this.state.firstName,
      lastName: this.state.lastName,
      phoneNumber: this.state.phoneNumber,
      positionId: this.state.position,
      roleId: "R2",
      address: null,
      gender: null,
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
    let positions = this.state.positionArr;
    let { email, password, firstName, lastName, phoneNumber, position } =
      this.state;

    return (
      <div className="login-background">
        <div
          className="login-container"
          style={{ height: "650px", marginTop: "50px" }}
        >
          <div className="login-content row">
            <div className="col-12  text-login">Tạo tài khoản bác sĩ</div>

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
                  placeholder="Nhập sđt"
                  value={phoneNumber}
                  onChange={(event) => this.onChangeInput(event, "phoneNumber")}
                />
              </div>
            </div>

            <div className="col-12">
              <label>Chức vị</label>
              <select
                className="form-control"
                onChange={(event) => this.onChangeInput(event, "position")}
                value={position}
              >
                {positions &&
                  positions.length > 0 &&
                  positions.map((item, index) => {
                    return (
                      <option key={index} value={item.keyMap}>
                        {item.valueVi}
                      </option>
                    );
                  })}
              </select>
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
    genderRedux: state.admin.genders,
    roleRedux: state.admin.roles,
    positionRedux: state.admin.positions,
    isLoadingGender: state.admin.isLoadingGender,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    navigate: (path) => dispatch(push(path)),
    getGenderStart: () => dispatch(actions.fetchGenderStart()),
    getPositionStart: () => dispatch(actions.fetchPositionStart()),
    getRoleStart: () => dispatch(actions.fetchRoleStart()),
    createNewUser: (data) => dispatch(actions.createNewUser(data)),
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    editAUserRedux: (data) => dispatch(actions.editAUser(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignupDoctor);

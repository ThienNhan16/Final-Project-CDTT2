import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom/cjs/react-router-dom.min";
import "./Sidebar.scss";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowSidebar: false,
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }
  handleShowSidebar = () => {
    this.setState({
      isShowSidebar: !this.state.isShowSidebar,
    });
  };

  render() {
    return (
      <>
        <div className="pop-up" onClick={this.handleShowSidebar}>
          <i className="fas fa-bars"></i>
        </div>
        <nav
          className="sidebar-nav"
          style={{ left: this.state.isShowSidebar ? "0" : "-100%" }}
        >
          <div className="close" onClick={this.handleShowSidebar}>
            <i class="fa fa-times"></i>
          </div>

          <div className="side-bar-links">
            <Link to={`/system/user-redux`}>Quản lý người dùng</Link>
            <Link to={`/doctor/manage-schedule`}>Quản lý lịch khám bệnh</Link>
            <Link to={`/doctor/manage-patient`}>Quản lý bệnh nhân</Link>
            <Link to={`/system/manage-doctor`}>Quản lý thông tin bác sĩ</Link>
            <Link to={`/login`}>Đăng nhập</Link>
          </div>
        </nav>
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);

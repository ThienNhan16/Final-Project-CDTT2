import React, { Component } from "react";
import { connect } from "react-redux";
import "./TableManageDoctor.scss";
import * as actions from "../../../store/actions";
import "react-markdown-editor-lite/lib/index";

class TableManageDoctor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      usersRedux: [],
    };
  }

  async componentDidMount() {
    await this.props.fetchUserRedux();
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (prevProps.listUsers !== this.props.listUsers) {
      this.setState({
        usersRedux: this.props.listUsers,
      });
    }
  }

  render() {
    const doctorArr = this.props.availableDoctors;

    return (
      <React.Fragment>
        <table id="TableManageUser">
          <tbody>
            <tr>
              <th>Email</th>
              <th>Họ và tên</th>
              <th>Thao tác</th>
            </tr>
            {doctorArr &&
              doctorArr.length > 0 &&
              doctorArr.map((item, index) => {
                return (
                  <tr key={index}>
                    <td>{item.email}</td>
                    <td>
                      {item.firstName} {item.lastName}
                    </td>

                    <td>
                      <button
                        className="btn-edit"
                        onClick={() => this.props.handleAddDoctor(item)}
                      >
                        <i className="fas fa-user-plus"></i>
                      </button>
                    </td>
                  </tr>
                );
              })}
          </tbody>
        </table>
      </React.Fragment>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    deleteAUserRedux: (id) => dispatch(actions.deleteAUser(id)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TableManageDoctor);

import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import "./ManagePatient.scss";
import DatePicker from "../../../components/Input/DatePicker";

class DefaultClass extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentDate: new Date(),
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnchangeDatePicker = (date) => {
    this.setState({
      currentDate: date[0],
    });
  };

  render() {
    return (
      <div className="manage-patient-container">
        <div className="m-p-title">Quản lý bệnh nhân khám bệnh</div>
        <div className="manage-patient-body row">
          <div className="col4 form-group">
            <label>Chọn ngày khám</label>
            <DatePicker
              onChange={this.handleOnchangeDatePicker}
              className="form-control"
              value={this.state.currentDate}
            />
          </div>
          <div className="col-12 table-manage-patient">
            <table style={{ width: "100%" }}>
              <tr>
                <th>name</th>
                <th colSpan="2">Telephone</th>
              </tr>
              <tr>
                <td>Heelo</td>
                <td>123</td>
                <td>123</td>
              </tr>
            </table>
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
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(DefaultClass);

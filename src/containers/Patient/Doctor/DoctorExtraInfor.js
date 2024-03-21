import React, { Component } from "react";
import { connect } from "react-redux";
import "./DoctorExtraInfor.scss";
import { getScheduleDoctorByDate } from "../../../services/userService";
import { LANGUAGES } from "../../../utils";
import { FormattedMessage } from "react-intl";

class DoctorExtraInfor extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isShowDetailInfor: false,
    };
  }

  async componentDidMount() {}

  componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  showHideDetailInfor = (status) => {
    this.setState({
      isShowDetailInfor: status,
    });
  };
  render() {
    let { isShowDetailInfor } = this.props;

    return (
      <div className="doctor-extra-infor-container">
        <div className="content-up">
          <div className="text-address">ĐỊA CHỈ khám</div>
          <div className="name-clinic">Phòng khám chuyên khoa Da Liễu</div>
          <div className="detail-address">207 Phố Huế</div>
        </div>

        <div className="content-down">
          {isShowDetailInfor === false && (
            <div className="short-ìnor">
              GIÁ KHÁM: 250.000đ
              <span onClick={() => this.showHideDetailInfor(true)}>
                Xem chi tiết
              </span>
            </div>
          )}

          {isShowDetailInfor === true && (
            <>
              <div className="title-price">GIÁ KHÁM: </div>
              <div className="detail-infor">
                <div className="price">
                  <span className="left">Giá khám</span>
                  <span className="right">250.000đ</span>
                </div>
                <div className="note">
                  Được ưu tiên khám trước khi đặt khám qua BookingCart.vn
                </div>
              </div>

              <div className="payment">Người bệnh có thể</div>
              <div className="hide-price">
                <span onClick={() => this.showHideDetailInfor(false)}>
                  Ẩn bảng giá
                </span>
              </div>
            </>
          )}
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

export default connect(mapStateToProps, mapDispatchToProps)(DoctorExtraInfor);

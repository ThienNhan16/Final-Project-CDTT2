import React, { Component } from "react";
import { connect } from "react-redux";
import "./ManageClinic.scss";
import MarkdownIt from "markdown-it";
import MEditor from "react-markdown-editor-lite";
import { CommonUtils } from "../../../utils";
import {
  createNewClinic,
  getAllClinic,
  getDetailInforDoctor,
} from "../../../services/userService";
import { toast } from "react-toastify";
import Select from "react-select";
import Lightbox from "react-image-lightbox";
import TableManageDoctor from "./TableManageDoctor";
import TableOwnedDoctor from "./TableOwnedDoctor";
import * as actions from "../../../store/actions";
import { CRUD_ACTIONS, LANGUAGES } from "../../../utils";

const mdParser = new MarkdownIt();

class UpdateClinic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      id: 0,
      name: "",
      address: "",
      imageBase64: "",
      descriptionHTML: "",
      descriptionMarkdown: "",
      dataSpecialty: [],
      previewImgURL: "",
      selectedOption: "",
      optionArr: [],
      isOpen: false,
      ownedDoctorArr: [],
      availableDoctorArr: [],
      isSaving: false,
    };
  }

  async componentDidMount() {
    await this.props.fetchUserRedux();

    let res = await getAllClinic();
    if (res && res.errCode === 0) {
      const newArray = res?.data.map((clinic) => ({
        value: clinic.id,
        label: clinic.name,
      }));
      this.setState({
        optionArr: newArray,
        dataSpecialty: res.data ? res.data : [],
        selectedOption: newArray[0],
      });
    }
    const defaultClinic = res?.data[0];

    let clinicId = 0;

    if (defaultClinic) {
      const { id, name, address, descriptionHTML, descriptionMarkdown, image } =
        defaultClinic;
      clinicId = id;
      this.setState({
        id,
        name,
        address,
        descriptionHTML,
        descriptionMarkdown,
        imageBase64: image,
        previewImgURL: image,
      });
    }

    let ownedDoctor = [];
    let availableDoctor = [];
    try {
      const userArr = [];
      await Promise.all(
        this.props.listUsers.map(async (item) => {
          const res = await getDetailInforDoctor(item.id);

          const {
            Markdown,
            Doctor_Infor,
            id,
            roleId,
            firstName,
            lastName,
            email,
          } = res?.data;
          userArr.push({
            Markdown,
            Doctor_Infor,
            id,
            roleId,
            firstName,
            lastName,
            email,
          });
        })
      );

      console.log(userArr);

      ownedDoctor = userArr.filter(
        (item) =>
          item.roleId === "R2" &&
          item.Doctor_Infor !== null &&
          item.Doctor_Infor.clinicId === clinicId
      );

      availableDoctor = userArr.filter(
        (item) =>
          item.roleId === "R2" &&
          (item.Doctor_Infor === null ||
            item.Doctor_Infor.clinicId !== clinicId)
      );

      console.log(ownedDoctor);
    } catch (e) {
      console.log(e);
    }

    this.setState({
      ownedDoctorArr: ownedDoctor,
      availableDoctorArr: availableDoctor,
    });
  }

  async componentDidUpdate(prevProps, prevState, snapshot) {
    if (this.props.language !== prevProps.language) {
    }
  }

  handleOnChangeInput = (event, id) => {
    let stateCopy = { ...this.state };
    stateCopy[id] = event.target.value;
    this.setState({
      ...stateCopy,
    });
  };

  handleEditorChange = ({ html, text }) => {
    this.setState({
      descriptionHTML: html,
      descriptionMarkdown: text,
    });
  };

  handleOnChangeImage = async (event) => {
    let data = event.target.files;
    let file = data[0];
    if (file) {
      let base64 = await CommonUtils.getBase64(file);
      let objectUrl = URL.createObjectURL(file);
      this.setState({
        previewImgURL: objectUrl,
        imageBase64: base64,
      });
    }
  };

  handleSaveNewClinic = async () => {
    console.log({
      action: "EDIT",
      id: this.state.id,
      name: this.state.name,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      image: this.state.imageBase64,
    });

    let res = await createNewClinic({
      action: "EDIT",
      id: this.state.id,
      address: this.state.address,
      name: this.state.name,
      descriptionHTML: this.state.descriptionHTML,
      descriptionMarkdown: this.state.descriptionMarkdown,
      imageBase64: this.state.imageBase64,
    });

    console.log(res);

    if (res && res.errCode === 0) {
      toast.success("Sửa thành công !");

      let res = await getAllClinic();
      if (res && res.errCode === 0) {
        const newArray = res?.data.map((clinic) => ({
          value: clinic.id,
          label: clinic.name,
        }));
        this.setState({
          optionArr: newArray,
          dataSpecialty: res.data ? res.data : [],
          selectedOption: newArray[0],
        });
      }

      this.setState({
        name: this.state.name,
        imageBase64: this.state.imageBase64,
        address: this.state.address,
        previewImgURL: this.state.previewImgURL,
        descriptionHTML: this.state.descriptionHTML,
        descriptionMarkdown: this.state.descriptionMarkdown,
      });
    } else {
      toast.error("something wrongs..." + res.errMessage);
    }
  };

  handleChangeSelect = async (selectedOption) => {
    const clinicInfo = this.state.dataSpecialty.find(
      (item) => item.id === selectedOption.value
    );
    this.setState({ selectedOption });

    if (clinicInfo) {
      const { id, name, address, descriptionHTML, descriptionMarkdown, image } =
        clinicInfo;

      let ownedDoctor = [];
      let availableDoctor = [];
      try {
        const userArr = [];
        await Promise.all(
          this.props.listUsers.map(async (item) => {
            const res = await getDetailInforDoctor(item.id);

            const {
              Markdown,
              Doctor_Infor,
              id,
              roleId,
              firstName,
              lastName,
              email,
            } = res?.data;
            userArr.push({
              Markdown,
              Doctor_Infor,
              id,
              roleId,
              firstName,
              lastName,
              email,
            });
          })
        );

        console.log(userArr);

        ownedDoctor = userArr.filter(
          (item) =>
            item.roleId === "R2" &&
            item.Doctor_Infor !== null &&
            item.Doctor_Infor.clinicId === id
        );

        availableDoctor = userArr.filter(
          (item) =>
            item.roleId === "R2" &&
            (item.Doctor_Infor === null || item.Doctor_Infor.clinicId !== id)
        );

        console.log(ownedDoctor);
      } catch (e) {
        console.log(e);
      }
      this.setState({
        id,
        name,
        address,
        descriptionHTML,
        descriptionMarkdown,
        imageBase64: image,
        previewImgURL: image,
        ownedDoctorArr: ownedDoctor,
        availableDoctorArr: availableDoctor,
      });
    }
  };

  openPreviewImage = () => {
    if (!this.state.previewImgURL) return;
    this.setState({
      isOpen: true,
    });
  };

  handleRemoveDoctorFromParent = async (user) => {
    console.log(user);
    const {
      priceId = "PRI1",
      paymentId = "PAY1",
      provinceId = "PRO1",
      nameClinic = "chưa có",
      addressClinic = "chưa có",
      note = "chưa có",
      specialtyId = "0",
    } = user?.Doctor_Infor || {};

    const {
      contentHTML = "",
      contentMarkdown = "",
      description = "",
    } = user?.Markdown || {};
    const hasOldData = user?.Doctor_Infor || user?.Markdown;
    console.log(hasOldData);

    this.props.saveDetailDoctor({
      contentHTML,
      contentMarkdown,
      description,
      doctorId: user.id,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPayment: paymentId,
      selectedPrice: priceId,
      selectedProvince: provinceId,
      nameClinic,
      addressClinic,
      note,
      clinicId: "0",
      specialtyId,
    });

    console.log(this.state.ownedDoctorArr);
    const filterItem = this.state.ownedDoctorArr.filter(
      (item) => item.id === user.id
    );
    const newOwnArr = this.state.ownedDoctorArr.filter(
      (item) => item.id !== user.id
    );
    const newAvailableArr = [...this.state.availableDoctorArr, ...filterItem];
    console.log(newOwnArr);
    console.log(newAvailableArr);

    this.setState({
      ownedDoctorArr: newOwnArr,
      availableDoctorArr: newAvailableArr,
    });
  };

  handleAddDoctorFromParent = async (user) => {
    console.log(user);
    const {
      priceId = "PRI1",
      paymentId = "PAY1",
      provinceId = "PRO1",
      nameClinic = "",
      addressClinic = "",
      note = "none",
      clinicId = "",
      specialtyId = "1",
    } = user?.Doctor_Infor || {};

    const {
      contentHTML = "none",
      contentMarkdown = "none",
      description = "none",
    } = user?.Markdown || {};
    const hasOldData = user?.Doctor_Infor || user?.Markdown;
    console.log(hasOldData);

    console.log({
      contentHTML,
      contentMarkdown,
      description,
    });

    await this.props.saveDetailDoctor({
      contentHTML,
      contentMarkdown,
      description,
      doctorId: user.id,
      action: hasOldData ? CRUD_ACTIONS.EDIT : CRUD_ACTIONS.CREATE,
      selectedPayment: paymentId,
      selectedPrice: priceId,
      selectedProvince: provinceId,
      nameClinic: this.state.name,
      addressClinic: this.state.address,
      note,
      clinicId: this.state.id,
      specialtyId,
    });

    console.log(this.state.ownedDoctorArr);
    const filterItem = this.state.availableDoctorArr.filter(
      (item) => item.id !== user.id
    );
    const newOwnArrVal = this.state.availableDoctorArr.filter(
      (item) => item.id === user.id
    );
    const newOwnArr = [...this.state.ownedDoctorArr, ...newOwnArrVal];

    this.setState({
      ownedDoctorArr: newOwnArr,
      availableDoctorArr: filterItem,
    });
  };

  render() {
    return (
      <div className="manage-specialty-container">
        <div className="ms-title">Cập nhập phòng khám</div>

        <div className="add-new-specialty row">
          <div className="col-6 form-group">
            <label>Chọn phòng khám</label>
            <Select
              value={this.state.selectedOption}
              onChange={(selectedOption) =>
                this.handleChangeSelect(selectedOption)
              }
              options={this.state.optionArr}
              placeholder={"  Chọn phòng khám"}
            />
          </div>
          <div className="col-6 form-group">
            <label>Tên phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.name}
              onChange={(event) => this.handleOnChangeInput(event, "name")}
              disabled={true}
            />
          </div>

          <div className="col-6 form-group">
            <label>Địa chỉ phòng khám</label>
            <input
              className="form-control"
              type="text"
              value={this.state.address}
              onChange={(event) => this.handleOnChangeInput(event, "address")}
            />
          </div>

          <div className="col-12 form-group">
            <label>Ảnh phòng khám</label>
            <input
              className="form-control-file"
              type="file"
              onChange={(event) => this.handleOnChangeImage(event)}
            />
          </div>
          <div className="col-12 form-group">
            <div
              className="preview-image"
              style={{
                width: "50%",
                height: "50px",
                backgroundImage: `url(${this.state.previewImgURL})`,
              }}
              onClick={() => this.openPreviewImage()}
            ></div>
          </div>

          <div className="col-12">
            <MEditor
              style={{ height: "300px" }}
              renderHTML={(text) => mdParser.render(text)}
              onChange={this.handleEditorChange}
              value={this.state.descriptionMarkdown}
            />
          </div>

          <div className="col-12">
            <button
              className="btn-save-specialty"
              onClick={() => this.handleSaveNewClinic()}
            >
              Cập nhập
            </button>
          </div>
        </div>

        {this.state.isOpen === true && (
          <Lightbox
            mainSrc={this.state.previewImgURL}
            onCloseRequest={() => this.setState({ isOpen: false })}
          />
        )}

        <div className="Table-zone">
          <div>
            <div className="title">Bác sĩ thuộc phòng khám</div>
            <TableOwnedDoctor
              handleRemoveDoctor={this.handleRemoveDoctorFromParent}
              ownedDoctors={this.state.ownedDoctorArr}
              clinicId={this.state.id}
            />
          </div>
          <div>
            <div className="title">Danh sách các bác sĩ</div>
            <TableManageDoctor
              handleAddDoctor={this.handleAddDoctorFromParent}
              availableDoctors={this.state.availableDoctorArr}
              clinicId={this.state.id}
            />
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    language: state.app.language,
    listUsers: state.admin.users,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchUserRedux: () => dispatch(actions.fetchAllUsersStart()),
    saveDetailDoctor: (data) => dispatch(actions.saveDetailDoctor(data)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(UpdateClinic);

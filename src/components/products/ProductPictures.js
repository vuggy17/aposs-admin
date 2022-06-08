import { Upload, Modal, message } from "antd";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import React from "react";

const getBase64 = (img, callback) => {
  const reader = new FileReader();
  reader.addEventListener("load", () => callback(reader.result));
  reader.readAsDataURL(img);
};

const validate = (file) => {
  const isImg = file["type"].includes("image");
  if (!isImg) message.error(`Upload failed, ${file.name} is not a image`);

  const isLt5M = file.size / 1024 / 1024 < 5;
  if (!isLt5M) {
    message.error(`Image must smaller than 5MB!`);
  }

  return (isImg && isLt5M) || Upload.LIST_IGNORE;
};
export class ProductPictures extends React.Component {
  state = {
    previewVisible: false,
    previewImage: "",
    previewTitle: "",
    loading: false,
  };

  handleCancel = () => this.setState({ previewVisible: false });

  // handlePreview = async (file) => {
  //   if (!file.url && !file.preview) {
  //     file.preview = await getBase64(file.originFileObj);
  //   }

  //   this.setState({
  //     previewImage: file.url || file.preview,
  //     previewVisible: true,
  //     previewTitle:
  //       file.name || file.url.substring(file.url.lastIndexOf("/") + 1),
  //   });
  // };
  onImageUploaded = this.props.onImageUploaded;

  handleChange = (info) => {
    if (info.file.status === "uploading") {
      this.setState({ loading: true });
      return;
    }

    if (info.file.status === "done") {
      // Get this url from response in real world.
      getBase64(info.file.originFileObj, (url) => {
        this.setState({
          loading: false,
        });
        // this.onImageUploaded(info.file?.response.secure_url);
      });
    }
  };

  render() {
    const { previewVisible, previewImage, previewTitle } = this.state;
    return (
      <Upload
        listType="picture-card"
        showUploadList={true}
        // onPreview={this.handlePreview}
        onChange={this.handleChange}
        // customRequest={this.handleUpload}
        action="http://128.199.254.45:3040/upload"
        beforeUpload={validate}
        multiple={true}
      >
        <div>
          {this.state.loading ? <LoadingOutlined /> : <PlusOutlined />}
          <div
            style={{
              marginTop: 8,
            }}
          >
            Upload
          </div>
        </div>
      </Upload>
    );
  }
}

{
  /* <Modal
    visible={previewVisible}
    title={previewTitle}
    footer={null}
    onCancel={this.handleCancel}
  >
    <img alt="example" style={{ width: "100%" }} src={previewImage} />
  </Modal> */
}

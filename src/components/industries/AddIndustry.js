import { UploadOutlined } from "@ant-design/icons";
import { Button, Form, Input, message, Modal, Upload } from "antd";
import { ENP_INDUSTRY } from "api/EndPoint";
import axios from "axios";
import { axios as customaxios } from "lib/axios/Interceptor";
import React, { useEffect, useState } from "react";
import { useRef } from "react";

export function AddIndustry({ visible, handleClose }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  // TODO: add api call to create category
  const onCreateCategory = async (data) => {
    const uploadUrl = "http://128.199.254.45:3040/upload";
    const fd = new FormData();
    fd.append("file", data.avatar.file);

    const hide = message.loading("Creating new industry", 0);
    setLoading(true);

    axios.post(uploadUrl, fd).then((r) => {
      const imageUrl = r.data.secure_url;
      customaxios
        .post("industry/add_industry", {
          name: data.name,
          images: [imageUrl],
          totalPurchased: 0,
          totalProduct: 0,
          rating: 5,
        })
        .then((r) => {
          setLoading(false);
        })
        .finally(() => {
          hide();
          setLoading(false);
        });
    });
  };

  return (
    <Modal
      title="Add industry"
      visible={visible}
      onOk={(_) => form.submit()}
      okButtonProps={{ loading: loading }}
      onCancel={(_) => handleClose()}
    >
      <Form layout="vertical" form={form} onFinish={onCreateCategory}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Xuan Ha collection" />
        </Form.Item>
        <Form.Item
          rules={[{ required: true }]}
          name="avatar"
          label="Description picture"
          extra="Industry picture"
        >
          <Upload
            name="logo"
            listType="picture"
            accept="image/*"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />} loading={loading}>
              Click to upload
            </Button>
          </Upload>
        </Form.Item>
      </Form>
    </Modal>
  );
}

const normFile = (e) => {
  console.log("Upload event:", e);
  if (Array.isArray(e)) {
    return e;
  }
  return e?.fileList;
};

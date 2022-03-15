import { Form, Input, Modal } from "antd";
import React from "react";

export function EditCategoryModal({ visible, handleClose, initialValues }) {
  const [form] = Form.useForm();

  // TODO: add api call to create category
  const editCategory = ({ title, description }) => {
    console.log(title, description);
  };
  return (
    <Modal
      title="Edit category"
      visible={visible}
      onOk={(_) => form.submit()}
      onCancel={(_) => handleClose()}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={editCategory}
        initialValues={initialValues}
      >
        <Form.Item name="name" label="Title" rules={[{ required: true }]}>
          <Input />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
}

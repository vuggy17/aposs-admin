import { Form, Input, Modal } from "antd";
import React from "react";

export function AddCategoryModal({ visible, handleClose }) {
  const [form] = Form.useForm();

  // TODO: add api call to create category
  const createCategory = ({ title, description }) => {
    console.log(title, description);
  };
  return (
    <Modal
      title="Add category"
      visible={visible}
      onOk={(_) => form.submit()}
      onCancel={(_) => handleClose()}
    >
      <Form layout="vertical" form={form} onFinish={createCategory}>
        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Xuan Ha collection" />
        </Form.Item>
        <Form.Item name="description" label="Description">
          <Input.TextArea placeholder="Optional" />
        </Form.Item>
      </Form>
    </Modal>
  );
}

import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import Breadcrumb from "components/shared/Breadcrumb";
import React from "react";
import { NEW_PRODUCT, PRODUCT_MANAGEMENT } from "routes/route.config";
import { ProductPictures } from "./ProductPictures";

const pages = [
  { url: "#", title: "Home" },
  { url: PRODUCT_MANAGEMENT, title: "Products" },
  { url: NEW_PRODUCT, title: "New product" },
];

export default function CreateProduct() {
  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb pages={pages} />
        <div className="pt-4">
          <h2>New product</h2>
        </div>
      </div>

      <div className="bg-white p-9 pt-6 pl-6">
        <Row>
          <Col span={8}>
            <Form
              layout="vertical"
              name="nest-messages"
              //   onFinish={onFinish}
              //   validateMessages={validateMessages}
            >
              <Form.Item
                name={["user", "name"]}
                label="Name"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>

              <Form.Item name={["user", "introduction"]} label="Introduction">
                <Input.TextArea rows={6} />
              </Form.Item>
              <Form.Item name={["user", "Category"]} label="Category">
                <Select>
                  {Array(6)
                    .fill({ label: "Xuan Ha collection", value: "CategoryID" })
                    .map(({ label, value }, index) => (
                      <Select.Option value={value}>
                        {label + index}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item name={["user", "quantity"]} label="Unit in stock">
                <InputNumber
                  style={{ width: "100%" }}
                  min={1}
                  max={100000}
                  defaultValue={3}
                />
              </Form.Item>
              <Form.Item name={["user", "price"]} label="Price">
                <InputNumber
                  style={{ width: "100%" }}
                  defaultValue={1000}
                  formatter={(value) =>
                    `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                />
              </Form.Item>

              {/* <Form.Item wrapperCol={{ span: 24, offset: 24 }}>
                <Button type="primary" htmlType="submit">
                  Submit
                </Button>
              </Form.Item> */}
            </Form>
          </Col>
          <Col span={8} offset={4}>
            <p>Upload product image</p>
            <ProductPictures />
            <Button type="primary" className="mt-6" size="large">
              Create product
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";
import Breadcrumb from "component/shared/Breadcrumb";
import React from "react";
import { useParams } from "react-router-dom";
import { EDIT_PRODUCT, PRODUCT_MANAGEMENT } from "routes/route.config";
import { ProductPictures } from "./ProductPictures";

const pages = [
  { url: "#", title: "Home" },
  { url: PRODUCT_MANAGEMENT, title: "Products" },
  { url: EDIT_PRODUCT, title: "Edit" },
];

export default function EditProduct({ title, price, units, description }) {
  const { productId } = useParams();
  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb />
        <div className="pt-4">
          <h2>{productId}</h2>
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
              <Form.Item>
                <Input disabled />
              </Form.Item>

              <Form.Item name={["user", "introduction"]} label="Introduction">
                <Input.TextArea rows={6} />
              </Form.Item>
              <Form.Item name={["user", "Category"]} label="Category">
                <Select>
                  {Array(6)
                    .fill({ label: "Xuan Ha collection", value: "CategoryID" })
                    .map(({ label, value }, index) => (
                      <Select.Option value={value + index} key={index}>
                        {label + index}
                      </Select.Option>
                    ))}
                </Select>
              </Form.Item>
              <Form.Item name={["user", "quantity"]} label="Unit in stock">
                <InputNumber style={{ width: "100%" }} min={1} max={100000} />
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
            </Form>
          </Col>
          <Col span={8} offset={4}>
            <p>Upload product image</p>
            <ProductPictures />
            <Button type="primary" className="mt-6" size="large">
              Apply changes
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

import { Button, Col, Form, Input, InputNumber, Row, Select } from "antd";

import Breadcrumb from "components/shared/Breadcrumb";

import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getAllCategories, selectAllCategories } from "redux/slices/category";
import { getAllProducts, selectProductById } from "redux/slices/product";
import { ProductPictures } from "./ProductPictures";

export default function EditProduct() {
  const { productName } = useParams();
  const product = useSelector((s) => selectProductById(s, productName));
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

  console.log(product);
  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());
  }, []);

  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb />
        <div className="pt-4">
          <h2>{product?.name}</h2>
        </div>
      </div>

      <div className="bg-white p-9 pt-6 pl-6">
        <Row>
          <Col span={8}>
            {product && (
              <Form
                layout="vertical"
                name="nest-messages"
                //   onFinish={onFinish}
                //   validateMessages={validateMessages}
                initialValues={{ ...product }}
              >
                <Form.Item label="Name" name="name">
                  <Input disabled />
                </Form.Item>

                <Form.Item name="description" label="Description">
                  <Input.TextArea rows={6} />
                </Form.Item>
                <Form.Item name="kind" label="Category">
                  <Select>
                    {categories.map(({ id, name }) => (
                      <Select.Option value={id} key={id}>
                        {name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item name="purchased" label="Unit in stock">
                  <InputNumber style={{ width: "100%" }} min={1} max={100000} />
                </Form.Item>
                <Form.Item name="price" label="Price">
                  <InputNumber
                    style={{ width: "100%" }}
                    formatter={(value) =>
                      `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                    }
                    parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                  />
                </Form.Item>
              </Form>
            )}
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

import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  notification,
  Row,
  Select,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { ENP_PRODUCT } from "api/EndPoint";
import Breadcrumb from "components/shared/Breadcrumb";
import { useAxios } from "hooks/useAxios";
import { axios } from "lib/axios/Interceptor";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCategories, selectAllCategories } from "redux/slices/category";
import { ProductPictures } from "./ProductPictures";

export default function CreateProduct() {
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const location = useLocation();
  const [form] = useForm();
  const navigate = useNavigate();
  const onFinish = (value) => {
    axios.post(ENP_PRODUCT, value).then((res) => {
      alert("product created");
      navigate(-1);
    });
  };
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);

  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb />
        <div className="pt-4">
          <h2>New product</h2>
        </div>
      </div>

      <div className="bg-white p-9 pt-6 pl-6">
        <Row>
          <Col span={8}>
            <Form
              form={form}
              layout="vertical"
              name="nest-messages"
              onFinish={onFinish}
              //   validateMessages={validateMessages}
            >
              <Form.Item name="name" label="Name" rules={[{ required: true }]}>
                <Input />
              </Form.Item>

              <Form.Item label="Description" name="description">
                <Input.TextArea rows={6} />
              </Form.Item>
              <Form.Item
                name="kindId"
                label="Category"
                initialValue={location.state?.categoryId}
              >
                <Select placeholder="Uncategorized">
                  {categories.map(({ id, name }) => (
                    <Select.Option value={id} key={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item name="quantity" label="Unit in stock">
                <InputNumber style={{ width: "100%" }} min={1} max={100000} />
              </Form.Item>
              <Form.Item name="price" label="Price">
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/(VND)\s?|(,*)/g, "")}
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
            <Button
              type="primary"
              className="mt-6"
              size="large"
              onClick={() => form.submit()}
            >
              Create product
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
}

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  notification,
  Row,
  Select,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { ENP_PRODUCT } from "api/EndPoint";
import Breadcrumb from "components/shared/Breadcrumb";
import { useAxios } from "hooks/useAxios";
import { axios } from "lib/axios/Interceptor";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import { getAllCategories, selectAllCategories } from "redux/slices/category";
import { getBase64, validate } from "../../util/ui-helper";
import { ProductPictures } from "./ProductPictures";

export default function CreateProduct() {
  const categories = useSelector(selectAllCategories);
  const dispatch = useDispatch();
  const location = useLocation();
  const [loading, setloading] = useState(false);
  const [form] = useForm();
  const navigate = useNavigate();

  const onFinish = (formData) => {
    const { upload, ...value } = formData;

    const url = ENP_PRODUCT + "/with-default-set";
    axios.post(url, value).then((res) => {
      const productId = res.data;

      const requests = upload.map((file, index) => {
        const url = file.response?.secure_url;
        return axios.post(ENP_PRODUCT + "/image", {
          productId: productId,
          imageUrl: url,
          priority: index + 1,
        });
      });
      Promise.all(requests)
        .then((res) => navigate(-1))
        .catch((err) => console.log(err));
    });
  };

  const handleChange = (info) => {
    if (info.file.status === "uploading") {
      setloading(true);
      return;
    }

    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        setloading(false);
      });
    }
  };

  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
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
        <Form
          form={form}
          layout="vertical"
          name="nest-messages"
          onFinish={onFinish}
        >
          <Row>
            <Col span={8}>
              <Form.Item
                name="name"
                label="Name"
                rules={[
                  { required: true, message: "Please input product name" },
                ]}
              >
                <Input />
              </Form.Item>

              <Form.Item
                label="Description"
                name="description"
                rules={[
                  { required: true, message: "Please input description" },
                ]}
              >
                <Input.TextArea rows={6} />
              </Form.Item>
              <Form.Item
                name="kindId"
                label="Category"
                initialValue={location.state?.categoryId}
                rules={[
                  { required: true, message: "Please select a category" },
                ]}
              >
                <Select placeholder="Uncategorized">
                  {categories.map(({ id, name }) => (
                    <Select.Option value={id} key={id}>
                      {name}
                    </Select.Option>
                  ))}
                </Select>
              </Form.Item>
              <Form.Item
                name="quantity"
                label="Unit in stock"
                rules={[
                  { required: true, message: "Number of product is missing" },
                ]}
              >
                <InputNumber style={{ width: "100%" }} min={1} max={100000} />
              </Form.Item>
              <Form.Item
                name="price"
                label="Price"
                rules={[{ required: true, message: "Please input price" }]}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `VND ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  parser={(value) => value.replace(/(VND)\s?|(,*)/g, "")}
                />
              </Form.Item>
            </Col>
            <Col span={8} offset={4}>
              <Form.Item
                rules={[
                  {
                    required: true,
                    message: "Please upload an image!",
                    type: "array",
                  },
                ]}
                name="upload"
                label="Pictures"
                valuePropName="fileList"
                getValueFromEvent={normFile}
                extra="File type accepted *svg/png/ipg"
              >
                <Upload
                  listType="picture-card"
                  showUploadList={true}
                  // onPreview={this.handlePreview}
                  onChange={handleChange}
                  // customRequest={this.handleUpload}
                  action="http://128.199.254.45:3040/upload"
                  beforeUpload={validate}
                  multiple={true}
                >
                  <div>
                    {loading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div
                      style={{
                        marginTop: 8,
                      }}
                    >
                      Upload
                    </div>
                  </div>
                </Upload>
              </Form.Item>
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
        </Form>
      </div>
    </>
  );
}

import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Col,
  Form,
  Input,
  InputNumber,
  message,
  Row,
  Select,
  Upload,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { ENP_PRODUCT } from "api/EndPoint";

import Breadcrumb from "components/shared/Breadcrumb";
import { axios } from "lib/axios/Interceptor";

import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { getAllCategories, selectAllCategories } from "redux/slices/category";
import { getAllProducts, selectProductById } from "redux/slices/product";
import { getBase64, validate } from "util/ui-helper";
import { ProductPictures } from "./ProductPictures";

export default function EditProduct() {
  const { productName } = useParams();
  const [images, setImages] = useState();
  const [loading, setloading] = useState(false);
  const [form] = useForm();
  const navigate = useNavigate();
  const location = useLocation();

  const product = useSelector((s) => selectProductById(s, productName));
  const [detail, setDetail] = useState();
  const dispatch = useDispatch();
  const categories = useSelector(selectAllCategories);

  const onFinish = (formData) => {
    const { upload, ...value } = formData;

    // axios.post(ENP_PRODUCT, value).then((res) => {
    //   const productId = res.data;

    const requests = upload.map(async (file, index) => {
      if (file?.url && file?.uid) {
        await axios.delete(ENP_PRODUCT + "/image/" + file.uid);
      }
      const url = file.response?.secure_url || file.url;
      return axios.post(ENP_PRODUCT + "/image", {
        productId: location.state.id,
        imageUrl: url,
        priority: index + 1,
      });
    });
    Promise.all(requests)
      .then((res) => navigate(-1))
      .catch((err) => console.log(err));

    // console.log(formData);
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

  const onRemoveimg = (img) => {
    axios
      .delete(ENP_PRODUCT + "/image/" + img.uid)
      .then((res) => message.success("Picture deleted"));
  };
  const normFile = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  useEffect(() => {
    dispatch(getAllProducts());
    dispatch(getAllCategories());

    axios.get(`${ENP_PRODUCT}/${location.state.id}`).then((res) => {
      setDetail(res.data);
    });

    axios.get(`${ENP_PRODUCT}/${location.state.id}/images`).then((res) => {
      const formatedImages = res.data.map((img) => ({
        uid: img.id,
        url: img.imageUrl,
        name: img.priority,
      }));
      setImages(formatedImages);
    });
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
        {detail && images ? (
          <Form
            form={form}
            initialValues={{
              upload: images || [],
              name: detail.name,
              description: detail.description,
              kindId: detail.kindId,
              price: detail.price,
            }}
            layout="vertical"
            name="nest-messages"
            onFinish={onFinish}
          >
            <Row>
              <Col span={8}>
                <Form.Item name="name" label="Name">
                  <Input disabled={true} />
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
                  initialValue={product?.kindId}
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
                    onChange={handleChange}
                    action="http://128.199.254.45:3040/upload"
                    beforeUpload={validate}
                    multiple={true}
                    onRemove={onRemoveimg}
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
                  Apply change
                </Button>
              </Col>
            </Row>
          </Form>
        ) : (
          " Loading..."
        )}
      </div>
    </>
  );
}

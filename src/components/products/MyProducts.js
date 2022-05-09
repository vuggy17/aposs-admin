import {
  EditOutlined,
  EllipsisOutlined,
  PlusOutlined,
} from "@ant-design/icons";
import {
  Avatar,
  Button,
  Card,
  Col,
  Descriptions,
  Drawer,
  Dropdown,
  Image,
  Input,
  Menu,
  Popconfirm,
  Progress,
  Row,
  Skeleton,
  Tooltip,
} from "antd";
import Meta from "antd/lib/card/Meta";
import { useAxios } from "hooks/useAxios";
import { ENP_PRODUCT } from "api/EndPoint";

import Breadcrumb from "components/shared/Breadcrumb";
import ProductStockStatus from "components/shared/ProductStockStatus";
import React, { Component, useEffect, useState } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import {
  EDIT_PRODUCT,
  NEW_PRODUCT,
  PRODUCT_MANAGEMENT,
} from "routes/route.config";
import { formatPrice } from "util/formatPrice";
import useDebounce from "hooks/useDebouce";
import { useDispatch, useSelector } from "react-redux";
import {
  getAllProducts,
  getProductWithName,
  selectAllProducts,
  set,
} from "redux/slices/product";
import { axios } from "lib/axios/Interceptor";
import {
  categoryUpdated,
  deleteProductOfCategory,
} from "redux/slices/category";

export default function Products() {
  const dispatch = useDispatch();

  const [productEditing, setproductEditing] = useState(false);
  const [editProduct, setEditProduct] = useState();
  let products = [];
  products = useSelector(selectAllProducts);

  const searchProduct = useSelector((state) => state.products?.searchResult);
  const handleAddProduct = () => {
    setproductEditing(!productEditing);
  };

  const onEditProduct = (product) => {
    return () => setEditProduct(product);
  };

  const onSearch = (e) => {
    const searchTerm = e.target.value;

    console.log("searching for " + searchTerm);
    // dispatch(deleteWithId(37));
    dispatch(getProductWithName(searchTerm));
  };

  useEffect(() => {
    if (editProduct) {
      setproductEditing(true);
    }
  }, [editProduct]);

  useEffect(() => {
    dispatch(getAllProducts());
  }, []);

  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb />
        <div className="pt-4">
          <h2>Products</h2>
        </div>
      </div>

      <div className=" mt-6 m-auto w-1/2">
        <Input.Search
          onChange={useDebounce(onSearch)}
          placeholder="Find a product"
          enterButton="Search"
          size="large"
        ></Input.Search>
      </div>

      <div className="mt-2">
        <Row gutter={[8, 8]}>
          <Col className="gutter-row" span={6}>
            <AddProduct handlePress={handleAddProduct} />
          </Col>
          {!searchProduct ||
            (searchProduct?.length == 0 &&
              products?.map(({ name, description, price, id, image }) => (
                <Col className="gutter-row" span={6} key={id}>
                  <ProductCard
                    title={name}
                    description={description}
                    onEditPressed={onEditProduct({
                      title: name,
                      description,
                      price,
                      id,
                    })}
                    price={price}
                    image={image}
                    stockStatus={Math.round(Math.random() * 100)}
                  />
                </Col>
              )))}
          {searchProduct?.length > 0 &&
            searchProduct?.map(({ name, description, price, id, image }) => (
              <Col className="gutter-row" span={6} key={id}>
                <ProductCard
                  title={name}
                  description={description}
                  onEditPressed={onEditProduct({
                    title: name,
                    description,
                    price,
                    id,
                  })}
                  price={price}
                  image={image}
                  stockStatus={Math.round(Math.random() * 100)}
                />
              </Col>
            ))}
        </Row>
      </div>

      <Drawer
        title="Quick view"
        placement="right"
        closable={false}
        onClose={() => setproductEditing(false)}
        visible={productEditing}
        // visible={true}
        getContainer={false}
        style={{ position: "absolute" }}
        width={600}
      >
        <p className="text-xl">
          {editProduct?.title}
          <Tooltip title="Edit product">
            <Link
              to={`/${PRODUCT_MANAGEMENT}/${editProduct?.title}`}
              state={{ id: editProduct?.id }}
            >
              <EditOutlined key="edit" />
            </Link>
          </Tooltip>
        </p>
        <Descriptions
          layout="horizontal"
          column={1}
          contentStyle={{ fontSize: "1rem", lineHeight: "1.5rem" }}
          labelStyle={{ fontSize: "1rem", lineHeight: "1.5rem" }}
        >
          <Descriptions.Item label="Description">
            {editProduct?.description}
          </Descriptions.Item>
          <Descriptions.Item label="Price">
            {formatPrice(editProduct?.price)}
          </Descriptions.Item>
          <Descriptions.Item label="Status">
            <ProductStockStatus inStock={true} />
          </Descriptions.Item>
          <Descriptions.Item label="Sales/Remain">12/32</Descriptions.Item>
        </Descriptions>

        <p className="text-base mt-2">Images: </p>
        <div className="grid grid-cols-4 gap-2">
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
          <Image src="https://zos.alipayobjects.com/rmsportal/jkjgkEfvpUPVyRjUImniVslZfWPnJuuZ.png" />
        </div>
      </Drawer>
    </>
  );
}
export function ProductCard({
  loading,
  title,
  description,
  onEditPressed,
  stockStatus,
  image,
  id,
  handleDelete,
}) {
  const menu = (
    <Menu>
      <Menu.Item key={id}>
        <Popconfirm
          placement="topLeft"
          title="Pernamently delete this product"
          onConfirm={() => handleDelete(id)}
          okText="OK"
          okButtonProps={{ danger: true }}
          cancelText="Cancel"
        >
          Delete
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );
  return (
    <Card
      hoverable={false}
      actions={[
        <EditOutlined key="edit" onClick={onEditPressed} />,
        <Dropdown overlay={menu} placement="bottom">
          <EllipsisOutlined key="ellipsis" />
        </Dropdown>,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          style={{ minHeight: 120 }}
          avatar={<Avatar src={image} alt="error" />}
          title={title}
          description={description}
        />
        <p>Products remain</p>
        <Progress percent={stockStatus} />
      </Skeleton>
    </Card>
  );
}

export function AddProduct({ path = NEW_PRODUCT, state }) {
  const navigate = useNavigate();
  const handlePress = () => {
    navigate(path, { state: state });
  };
  return (
    <Button
      type="dashed"
      className="w-full "
      style={{ minHeight: "100%" }}
      onClick={handlePress}
    >
      <PlusOutlined />
      add new product
    </Button>
  );
}

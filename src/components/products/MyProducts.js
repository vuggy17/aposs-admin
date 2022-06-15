import {
  DeleteOutlined,
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
  Rate,
  Row,
  Skeleton,
  Typography,
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
import product, {
  deleteProduct,
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

const { Paragraph, Text } = Typography;

export default function Products() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [productEditing, setproductEditing] = useState(false);
  const [editProduct, setEditProduct] = useState();
  let products = [];
  products = useSelector(selectAllProducts);

  const handleAddProduct = () => {
    setproductEditing(!productEditing);
  };

  const onEditProduct = (product) => {
    navigate(`/${PRODUCT_MANAGEMENT}/${product?.title}`, {
      state: { id: product.id },
    });
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
          <Col className="gutter-row" xl={6} lg={8} md={12}>
            <AddProduct handlePress={handleAddProduct} />
          </Col>
          {products?.length > 0 ? (
            products.map(({ name, purchased, price, id, image, rating }) => (
              <Col className="gutter-row" xl={6} lg={8} md={12} key={id}>
                <ProductCard
                  id={id}
                  title={name}
                  description={purchased}
                  onEditPressed={() =>
                    onEditProduct({
                      title: name,
                      purchased,
                      price,
                      id,
                    })
                  }
                  price={price}
                  rating={rating}
                  image={image}
                  purchased={purchased}
                  onDeleteProduct={() => {
                    dispatch(deleteProduct({ id, name }));
                  }}
                />
              </Col>
            ))
          ) : (
            <div className="h-60 ">No product to display!</div>
          )}
        </Row>
      </div>
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
  purchased,
  price,
  rating,
  onDeleteProduct,
}) {
  const dispatch = useDispatch();
  return (
    <Card
      hoverable={false}
      actions={[
        <EditOutlined key="edit" onClick={onEditPressed} />,
        <Popconfirm
          placement="topLeft"
          title="Pernamently delete this product"
          onConfirm={onDeleteProduct}
          okText="OK"
          okButtonProps={{ danger: true }}
          cancelText="Cancel"
        >
          <DeleteOutlined key="delete" />,
        </Popconfirm>,
      ]}
    >
      <div className="text-center">
        <img
          src={image}
          className="w-full mb-4 h-60 object-cover"
          alt="error"
        />

        <Paragraph
          className="font-semibold text-xl"
          ellipsis={{ rows: 1, expandable: true, symbol: "more" }}
        >
          {title}
        </Paragraph>
        <p className="font-semibold text-blue-600 text-xl tracking-tight">
          ${price}
        </p>
        <p className="mb-0">SOLD: {purchased} item(s)</p>
      </div>
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

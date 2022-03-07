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
import Breadcrumb from "components/shared/Breadcrumb";
import ProductStockStatus from "components/shared/ProductStockStatus";
import React, { Component, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import {
  EDIT_PRODUCT,
  NEW_PRODUCT,
  PRODUCT_MANAGEMENT,
} from "routes/route.config";
import { formatPrice } from "util/formatPrice";
import useDebounce from "util/hooks/useDebouce";

const pages = [
  { url: "#", title: "Home" },
  { url: PRODUCT_MANAGEMENT, title: "Products" },
];

export default function Products() {
  const [loading, setLoading] = useState(false);
  const [productEditing, setproductEditing] = useState(false);
  const [editProduct, setEditProduct] = useState();
  const handleAddProduct = () => {
    setproductEditing(!productEditing);
  };

  const onEditProduct = (product) => {
    return () => setEditProduct(product);
  };

  const onSearch = (term) => {
    console.log("searching for " + term);
  };

  useEffect(() => {
    if (editProduct) {
      setproductEditing(true);
    }
  }, [editProduct]);

  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb pages={pages} />
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
          {Array(6)
            .fill({
              title: "Xiao Feng Necklace",
              description:
                "Lorem, ipsum dolor sit amet  temporibus, sunt qui asperiores, voluptates beatae est. Sunt pariatur, exercitationem nisi magnam vel porro.",
              price: Math.round(Math.random() * 4000000),
            })
            .map(({ title, description, price }, index) => (
              <Col className="gutter-row" span={6} key={index}>
                <ProductCard
                  title={title + index}
                  description={description}
                  onEditPressed={onEditProduct({
                    title: title + index,
                    description,
                    price,
                  })}
                  price={price}
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
            <Button
              type="link"
              href={`${PRODUCT_MANAGEMENT}/${editProduct?.title}`}
            >
              <EditOutlined key="edit" />
            </Button>
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
}) {
  const menu = (
    <Menu>
      <Menu.Item>
        <Popconfirm
          placement="topLeft"
          title="Pernamently delete this product"
          onConfirm={() => alert("deleting")}
          okText="OK"
          okButtonProps={{ danger: true }}
          cancelText="Cancel"
        >
          <a
            target="_blank"
            rel="noopener noreferrer"
            href="https://www.antgroup.com"
          >
            Delete
          </a>
        </Popconfirm>
      </Menu.Item>
    </Menu>
  );
  return (
    <Card
      hoverable={false}
      actions={[
        <EditOutlined key="edit" onClick={onEditPressed} />,
        <Dropdown overlay={menu} placement="bottomCenter">
          <EllipsisOutlined key="ellipsis" />
        </Dropdown>,
      ]}
    >
      <Skeleton loading={loading} avatar active>
        <Meta
          style={{ minHeight: 150 }}
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />}
          title={title}
          description={description}
        />
        <p>Products remain</p>
        <Progress percent={stockStatus} />
      </Skeleton>
    </Card>
  );
}

export function AddProduct() {
  const navigate = useNavigate();
  const handlePress = () => {
    navigate(NEW_PRODUCT);
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

import Breadcrumb from "components/shared/Breadcrumb";
import React from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  ADD_PRODUCT_FROM_CATEGORY,
  CATEGORY_MANAGEMENT,
  EDIT_PRODUCT_FROM_CATEGORY,
  PRODUCT_MANAGEMENT,
} from "routes/route.config";
import menIcon from "asset/men.png";
import { EditOutlined } from "@ant-design/icons";
import { Col, Row } from "antd";
import { AddProduct, ProductCard } from "components/products/Products";

export default function Category() {
  const { categoryId } = useParams();

  const navigate = useNavigate();
  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb />
        <div className="pt-4 flex">
          <div className="relative">
            <img
              src={menIcon}
              alt="cc"
              className="rounded-full "
              width={100}
            ></img>
            <div className="absolute transition-all duration-300 hover:opacity-60 bg-black h-full w-full left-0 top-0 opacity-0 text-white text-center">
              <label
                id="getFileLabel"
                htmlFor="getFile"
                className="w-full h-full flex items-center justify-center cursor-pointer"
              >
                <EditOutlined /> change
              </label>
              <input type="file" className="hidden" id="getFile" />
            </div>
          </div>
          <div className="flex-1">
            <h2>{categoryId}</h2>
            <p className="opacity-80 text-gray-800 text-base">
              "Lorem, ipsum dolor sit amet temporibus, sunt qui asperiores,
              voluptates beatae est. Sunt pariatur, exercitationem nisi magnam
              vel porro.",
            </p>
            <p className="opacity-80 text-gray-800 text-base">
              Sold: 240 items
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-center mt-5">In this category</h3>

        <div className="mt-2">
          <Row gutter={[8, 8]}>
            <Col className="gutter-row" span={6}>
              <AddProduct
                path={`/${CATEGORY_MANAGEMENT}/${categoryId}/new-product`}
                // handlePress={handleAddProduct}
              />
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
                    onEditPressed={() =>
                      navigate(
                        `/${CATEGORY_MANAGEMENT}/${categoryId}/${title + index}`
                      )
                    }
                    price={price}
                    stockStatus={Math.round(Math.random() * 100)}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
}

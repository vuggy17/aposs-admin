import Breadcrumb from "components/shared/Breadcrumb";
import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { CATEGORY_MANAGEMENT } from "routes/route.config";
import { EditOutlined } from "@ant-design/icons";
import { Col, message, notification, Row, Tooltip } from "antd";
import { AddProduct, ProductCard } from "components/products/MyProducts";
import EditableContainer from "components/shared/EditableText";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryUpdated,
  getAllCategories,
  selectCategoryById,
} from "redux/slices/category";

import { ENP_PRODUCT } from "api/EndPoint";
import { axios } from "lib/axios/Interceptor";

export default function Category() {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { image, name, id, products } =
    useSelector((state) => selectCategoryById(state, categoryName)) || {};

  const deleteProduct = (prodId) => {
    axios.delete(ENP_PRODUCT + "/" + prodId).then((res) => {
      console.log(res);
      notification.success({
        message: "Product deleted",
      });
      dispatch(
        categoryUpdated({
          id: name,
          changes: {
            products: products.filter((p) => p.id !== prodId),
          },
        })
      );
    });
  };
  useEffect(() => {
    dispatch(getAllCategories());
  }, []);
  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb />
        <div className="pt-4 flex">
          <div className="relative mr-2 p-2">
            <img
              src={image}
              alt="fail"
              className="rounded-full"
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
            <Tooltip title="Click to start editing" placement="rightTop">
              <span>
                <EditableContainer>
                  <EditableContainer.Header value={name} />
                </EditableContainer>
              </span>
            </Tooltip>
            <Tooltip title="Click to start editing" placement="rightTop">
              <span>
                <EditableContainer>
                  <EditableContainer.Text
                    value="Lorem, ipsum dolor sit amet temporibus, sunt qui asperiores,
                voluptates beatae est. Sunt pariatur, exercitationem nisi magnam
                vel porro."
                  />
                </EditableContainer>
              </span>
            </Tooltip>
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
                path={`/${CATEGORY_MANAGEMENT}/${categoryName}/new-product`}
                state={{ categoryId: id }}
                // handlePress={handleAddProduct}
              />
            </Col>
            {products &&
              products.length > 0 &&
              products.map((item) => (
                <Col className="gutter-row" span={6} key={item.id}>
                  <ProductCard
                    title={item.name}
                    description="Some fancy description necessitatibus recusandae dignissimos ut itaque explicabo soluta."
                    onEditPressed={() =>
                      navigate(
                        `/${CATEGORY_MANAGEMENT}/${categoryName}/${item.name}`,
                        { state: { id: item.id } }
                      )
                    }
                    price={item.price}
                    stockStatus={Math.round(Math.random() * 100)}
                    image={item.image}
                    id={item.id}
                    categoryId={name}
                    handleDelete={deleteProduct}
                  />
                </Col>
              ))}
          </Row>
        </div>
      </div>
    </>
  );
}

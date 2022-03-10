import React from "react";

import Breadcrumb from "components/shared/Breadcrumb";
import { ORDER_DETAIL, ORDER_MANAGEMENT } from "routes/route.config";
import { useParams } from "react-router-dom";
import { Col, Row, Steps, Table } from "antd";
import ProductTable from "components/products/ProductTable";
import { dataProducts } from "../order-manager/dataProduct";
import FormatProduct from "components/products/FormatProduct";

export default function OrderDetail() {
  let { orderId } = useParams();

  const pages = [
    { url: "#", title: "Home" },
    { url: ORDER_MANAGEMENT, title: "Order" },
    { url: ORDER_DETAIL, title: `#${orderId}` },
  ];

  return (
    <>
      <div className="bg-white p-9 pl-6 pt-4">
        <Breadcrumb pages={pages} />
      </div>

      <div className="bg-white p-9 pt-0 pl-6">
        <Row>
          <Col>
            <h1 className="text-3xl mb-10">Order number: #{orderId}</h1>
          </Col>
        </Row>
        <Row>
          <Col span={14}>
            <Row>
              <Col span={12}>
                <p>Customer: Phạm Minh Tân</p>
              </Col>
              <Col span={12}>
                <p>Ordering Products: Women's hoodie</p>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <p>Creation time: 07/07/2001</p>
              </Col>
              <Col span={12}>
                <p>Associated documents: 12421</p>
              </Col>
            </Row>
            <Row>
              <Col span={12}>
                <p>Effective date: 2017-07-07 ~ 2017-08-08</p>
              </Col>
              <Col span={12}>
                <p>Remark: Please confirm within two working days</p>
              </Col>
            </Row>
          </Col>
          <Col span={6} offset={4}>
            <Row className="text-slate-400">
              <Col span={12}>
                <p>Status</p>
              </Col>
              <Col span={12}>
                <p>Totals</p>
              </Col>
            </Row>
            <Row className="text-2xl">
              <Col span={12}>
                <p>Pending</p>
              </Col>
              <Col span={12}>
                <p>500$</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="bg-white m-6 p-9 pt-6 pl-6">
        <div className="border-0 border-b border-solid border-slate-200">
          <h1>Process progress</h1>
        </div>
        <div className="pt-9">
          <Steps progressDot current={0}>
            <Steps.Step
              title="Create order"
              description="Phạm Minh Tân 07/07/2001"
            />
            <Steps.Step title="Waiting for the goods" />
            <Steps.Step title="Delivery" />
            <Steps.Step title="Finish" />
          </Steps>
        </div>
      </div>
      <div className="bg-white m-6 p-9 pt-6 pl-6">
        <div className="border-0 border-b border-solid border-slate-200">
          <h1>User info</h1>
        </div>
        <Row className="mt-6">
          <Col span={24}>
            <Row>
              <Col span={8}>
                <p>Name: Phạm Minh Tân</p>
              </Col>
              <Col span={8}>
                <p>Member card number: 0123456789</p>
              </Col>
              <Col span={8}>
                <p>ID card: 0123456789</p>
              </Col>
            </Row>
            <Row>
              <Col span={8}>
                <p>Contact phone: 0123456789</p>
              </Col>
              <Col span={12}>
                <p>Address: 123 duong 456, p789, quan Thu Duc</p>
              </Col>
            </Row>
          </Col>
        </Row>
      </div>
      <div className="bg-white m-6 p-9 pt-6 pl-6">
        <div className="border-0 border-b border-solid border-slate-200">
          <h1>Products</h1>
        </div>
        <div className="pt-6">
          <ProductTable source={dataProducts.map(FormatProduct)} />
        </div>
      </div>
    </>
  );
}

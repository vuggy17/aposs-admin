import React from "react";

import Breadcrumb from "components/shared/Breadcrumb";
import { ORDER_DETAIL, ORDER_MANAGEMENT } from "routes/route.config";
import { useLocation, useParams } from "react-router-dom";
import { Badge, Col, Row, Steps, Table } from "antd";
import ProductTable from "components/products/ProductTable";
import FormatProduct from "util/formatProduct";

export default function OrderDetail(props) {

  const location = useLocation();

  const customerData = location.state;
  const productsData = location.state.orderItemDTOList;

  let { orderId } = useParams();

  const pages = [
    { url: "#", title: "Home" },
    { url: ORDER_MANAGEMENT, title: "Order" },
    { url: ORDER_DETAIL, title: `#${orderId}` },
  ];

  let progressCurrentStep = 0;

  function createDataByStatus() {
    switch (customerData.orderStatus) {
      case "Cancel":
        progressCurrentStep = 2;
        return <p><Badge color="red" text="CANCEL" /></p>
      case "Pending":
        progressCurrentStep = 1;
        return <p><Badge color="yellow" text="PENDING" /></p>
      case "Accept":
        progressCurrentStep = 2;
        return <p><Badge color="green" text="ACCEPT" /></p>
      case "Finish":
        progressCurrentStep = 3;
        return <p><Badge color="green" text="FINISH" /></p>
    }
  }

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
              <Col>
                <p>Customer: {customerData.customerEmail}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Order time: {customerData.orderTime}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Cancel reason: {customerData.cancelReason}</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Address: {customerData.address}</p>
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
                {createDataByStatus()}
              </Col>
              <Col span={12}>
                <p>{customerData.totalPrice}</p>
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
          <Steps progressDot current={progressCurrentStep}>
            <Steps.Step
              title="Create order" />
            <Steps.Step title="Pending" />
            <Steps.Step title={progressCurrentStep == 3 ? customerData.orderStatus : "Accept"} />
            <Steps.Step title="Finish" />
          </Steps>
        </div>
      </div>
      <div className="bg-white m-6 p-9 pt-6 pl-6">
        <div className="border-0 border-b border-solid border-slate-200">
          <h1>Products</h1>
        </div>
        <div className="pt-6">
          <ProductTable source={productsData.map(FormatProduct)} />
        </div>
      </div>
    </>
  );
}

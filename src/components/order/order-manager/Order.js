import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { Table, Space } from "antd";

import { Button, Input, List, Badge } from "antd";

import Breadcrumb from "../../shared/Breadcrumb";
import {
  CaretRightOutlined,
} from "@ant-design/icons";


import { ORDER_MANAGEMENT } from "routes/route.config";

import "./Order.css";
import Navigation from "components/shared/Navigation";
import useDebounce from "hooks/useDebouce";
import { ENP_ORDER } from "api/EndPoint";
import { axios } from "lib/axios/Interceptor";

export default function Order() {
  const pages = [
    { url: "#", title: "Home" },
    { url: ORDER_MANAGEMENT, title: "Order" },
  ];

  const [orderList, setOrderList] = useState();

  useEffect(async () => {
    const response = await axios.get(ENP_ORDER);

    setOrderList(response.data);
  });

  const onSearch = (e) => {
    const searchTerm = e.target.value;
    // TODO: api call and filter items
    console.log("searching", searchTerm);
  };

  const columnsOrder = [
    {
      title: "ORDER NO.",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "STATUS",
      dataIndex: "orderStatus",
      key: "orderStatus",
      render: (statusOrder) => {
        if (statusOrder == "Moving")
          return <Badge color="green" text={statusOrder} />;
        else if (statusOrder == "Pending")
          return <Badge color="yellow" text={statusOrder} />;
        if (statusOrder == "Cancel")
          return <Badge color="red" text={statusOrder} />;
      },
    },
    {
      title: "EMAIL",
      dataIndex: "customerEmail",
      key: "customerEmail",
    },
    {
      title: "ADDRESS",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "",
      key: "action",
      render: (text, record) => (
        <Space size="middle">
          <a>Accept</a>
          <a>Delete</a>
        </Space>
      ),
    },
    // Open order detail in new tab
    {
      title: "",
      key: "orderDetail",
      render: (text, record) => {
        // Substring for remove #(anchor) in id
        return (
          <Link to={`/order/${record.id}`} state={record}>
            <CaretRightOutlined style={{ color: "black" }} />
          </Link>
        );
      },
    },
  ];

  return (
    <div>
      <div className="bg-white p-9 pl-6 pt-6">
        <Breadcrumb />
        <div className="pt-6">
          <h2>Order</h2>
        </div>
      </div>
      <div className=" mt-6 mb-4 m-auto w-1/2">
        <Input.Search
          onChange={useDebounce(onSearch)}
          placeholder="Customer name"
          enterButton="Search"
          size="large"
        ></Input.Search>
      </div>
      <Table
        className="tb__order"
        dataSource={orderList}
        columns={columnsOrder}
      />
    </div>
  );
}

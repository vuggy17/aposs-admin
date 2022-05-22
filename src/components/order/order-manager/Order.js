import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link, Outlet } from "react-router-dom";

import { Table, Space, Popover, Popconfirm } from "antd";

import { Button, Input, List, Badge } from "antd";

import Breadcrumb from "../../shared/Breadcrumb";
import {
  CaretRightOutlined,
} from "@ant-design/icons";


import { ORDER_MANAGEMENT } from "routes/route.config";

import "./Order.css";
import useDebounce from "hooks/useDebouce";
import { ENP_CHANGE_ORDER_STATUS, ENP_CANCEL_ORDER, ENP_ORDER } from "api/EndPoint";
import { axios } from "lib/axios/Interceptor";

const ORDER_STATUS_PENDING = 0;
const ORDER_STATUS_CONFIRMED = 1;
const ORDER_STATUS_CANCEL = 2;
const ORDER_STATUS_DELIVERING = 3;
const ORDER_STATUS_SUCCESS = 4;


export default function Order() {
  const pages = [
    { url: "#", title: "Home" },
    { url: ORDER_MANAGEMENT, title: "Order" },
  ];

  const [orderList, setOrderList] = useState();
  const [cancelReason, setCancelReason] = useState("");

  useEffect(async () => {
    const response = await axios.get(ENP_ORDER);

    setOrderList(response.data);
  }, []);

  const onSearch = (e) => {
    const searchTerm = e.target.value;
    // TODO: api call and filter items
    console.log("searching", searchTerm);
  };

  const generateStatusID = (status) => {
    switch (status) {
      case "Pending": return ORDER_STATUS_PENDING;
      case "Confirmed": return ORDER_STATUS_CONFIRMED;
      case "Cancel": return ORDER_STATUS_CANCEL;
      case "Delivering": return ORDER_STATUS_DELIVERING;
      case "Success": return ORDER_STATUS_SUCCESS;
    }
  }

  const onClickConfirmed = async (id) => {
    await axios
      .put(ENP_CHANGE_ORDER_STATUS + `/${id}?status=Confirmed`);
    const response = await axios.get(ENP_ORDER);

    setOrderList(response.data);
  }

  const onClickDelivering = async (id) => {
    await axios
      .put(ENP_CHANGE_ORDER_STATUS + `/${id}?status=Delivering`);
    const response = await axios.get(ENP_ORDER);

    setOrderList(response.data);
  }

  const onClickSuccess = async (id) => {
    await axios
      .put(ENP_CHANGE_ORDER_STATUS + `/${id}?status=Success`);
    const response = await axios.get(ENP_ORDER);

    setOrderList(response.data);
  }

  const onClickCancel = async (id, cancelReason) => {
    await axios
      .put(ENP_CANCEL_ORDER + `/${id}`, cancelReason)
    const response = await axios.get(ENP_ORDER);

    setOrderList(response.data);
  }


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
        switch (statusOrder) {
          case "Cancel":
            return <Badge color="red" text="Cancel" />
          case "Pending":
            return <Badge color="yellow" text="Pending" />
          case "Confirmed":
            return <Badge color="green" text="Confirmed" />
          case "Delivering":
            return <Badge color="yellow" text="Delivering" />
          case "Success":
            return <Badge color="green" text="Success" />
        }
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
      width: '40%',
    },
    {
      title: "",
      key: "action",
      render: (text, record) => {
        const idStatus = generateStatusID(record.orderStatus)
        if (record.orderStatus != "Cancel")
          return (
            <Space size="middle">
              <a className={idStatus == ORDER_STATUS_PENDING ? "" : "disable-link"} onClick={() => onClickConfirmed(record.id)}>Confirmed</a>
              <a className={idStatus == ORDER_STATUS_CONFIRMED ? "" : "disable-link"} onClick={() => onClickDelivering(record.id)}>Delivering</a>
              <a className={idStatus == ORDER_STATUS_DELIVERING ? "" : "disable-link"} onClick={() => onClickSuccess(record.id)}>Success</a>
              <Popover
                title="Cancel reason"
                content={
                  <div>
                    <Input.Group compact>
                      <Input onChange={(e) => setCancelReason(e.target.value)} />
                    </Input.Group>
                    <div className="mt-2">
                      <Button onClick={() => onClickCancel(record.id, cancelReason)}>OK</Button>
                    </div>
                  </div>
                }
                trigger="click"
              ><a>Cancel</a></Popover>
            </Space>)
        else return;
      },
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

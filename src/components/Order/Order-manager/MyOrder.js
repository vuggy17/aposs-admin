<<<<<<<< HEAD:src/components/Order/Order-manager/Order.js
import React from "react"
import { useState, useEffect, useLayoutEffect } from "react"
import { Link, Outlet } from "react-router-dom";

import { Table, Space } from "antd"
import { Button, Input, List, Badge } from "antd";
import useDebounce from "util/hooks/useDebouce";
import Breadcrumb from "../../shared/Breadcrumb";
import { CaretDownOutlined, CaretUpOutlined, CaretRightOutlined } from "@ant-design/icons"
========
import React from "react";
import { useState, useEffect, useLayoutEffect } from "react";
import { Link } from "react-router-dom";

import { Table, Space } from "antd";
import { Button, Input, List } from "antd";
import useDebounce from "util/hooks/useDebouce";
import Breadcrumb from "../shared/Breadcrumb";
import {
  CaretDownOutlined,
  CaretUpOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
>>>>>>>> eb4f3dd5ee2eee6edd0d808632bd2f528d45b1b4:src/components/Order/Order-manager/MyOrder.js

import { dataProducts } from "./dataProduct";
import { dataOrder } from "./dataOrder";

import { ORDER_MANAGEMENT } from "routes/route.config";
<<<<<<<< HEAD:src/components/Order/Order-manager/Order.js
import "./Order.css"
import Navigation from "components/shared/Navigation";

========
import "./MyOrder.css";
>>>>>>>> eb4f3dd5ee2eee6edd0d808632bd2f528d45b1b4:src/components/Order/Order-manager/MyOrder.js

export default function Order() {
  const pages = [
    { url: "#", title: "Home" },
    { url: ORDER_MANAGEMENT, title: "Order" },
  ];

  const [products, setProducts] = useState(dataProducts);
  const [orderList, setOrderList] = useState(dataOrder);

  useEffect(() => {
    // TODO: api call and filter items
    setProducts(dataProducts);
  });

  //Calculate total
  useEffect(() => {
    // Deep copy
    const data = JSON.parse(JSON.stringify(orderList));

    for (let i = 0; i < data.length; i++) {
      let total = 0;
      for (let j = 0; j < products.length; j++) {
        if (data[i].key == products[j].id) {
          //if data.total is exists
          if (data[i].total) {
            total = total + parseInt(products[j].price);
          }
        }
      }
      data[i].total = total + " $";
    }
    setOrderList(data);
  }, [products]);

<<<<<<<< HEAD:src/components/Order/Order-manager/Order.js
========
  function formatProduct({ key, img, name, color, size, amount, price }) {
    return {
      key,
      info: {
        img,
        name,
        color,
        size,
      },
      amount,
      price,
    };
  }

>>>>>>>> eb4f3dd5ee2eee6edd0d808632bd2f528d45b1b4:src/components/Order/Order-manager/MyOrder.js
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
<<<<<<<< HEAD:src/components/Order/Order-manager/Order.js
      title: 'STATUS',
      dataIndex: 'statusOrder',
      key: 'statusOrder',
      render: statusOrder => {
        if (statusOrder == 'Moving') return <Badge color='green' text={statusOrder} />
        else if (statusOrder == 'Pending') return <Badge color='yellow' text={statusOrder} />
        if (statusOrder == 'Cancelled') return <Badge color='red' text={statusOrder} />
      }
========
      title: "STATUS",
      dataIndex: "statusOrder",
      key: "statusOrder",
>>>>>>>> eb4f3dd5ee2eee6edd0d808632bd2f528d45b1b4:src/components/Order/Order-manager/MyOrder.js
    },
    {
      title: "OPERATORS",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "LOCATION",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "DISTANCE",
      dataIndex: "distance",
      key: "distance",
    },
    {
      title: "START DATE",
      dataIndex: "orderTime",
      key: "orderTime",
    },
    {
      title: "EST DELIVERY DUE",
      dataIndex: "estDelivery",
      key: "estDelivery",
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
<<<<<<<< HEAD:src/components/Order/Order-manager/Order.js
      title: '',
      key: 'orderDetail',
      render: (text, record) => {
        // Substring for remove #(anchor) in id
        return <Link to={`/order/${record.id.substring(1)}`}><CaretRightOutlined style={{ color: 'black' }} /></Link>
      }
========
      title: "",
      key: "orderDetail",
      render: () => (
        <Link to={`${ORDER_MANAGEMENT}/:id`}>
          <CaretRightOutlined style={{ color: "black" }} />
        </Link>
      ),
>>>>>>>> eb4f3dd5ee2eee6edd0d808632bd2f528d45b1b4:src/components/Order/Order-manager/MyOrder.js
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
      // expandable={{
      //   expandedRowRender: record => {

<<<<<<<< HEAD:src/components/Order/Order-manager/Order.js
      //     return <ProductTable source={(products.filter(product => product.id == record.key)).map(formatProduct)} />
      //   }
      //   ,
      //   expandIcon: ({ expanded, onExpand, record }) => expanded ? (
      //     <CaretUpOutlined onClick={e => onExpand(record, e)} />
      //   ) : (
      //     <CaretDownOutlined onClick={e => onExpand(record, e)} />
      //   )
      // }}
      />
========
        //     return <ProductTable source={(products.filter(product => product.id == record.key)).map(formatProduct)} />
        //   }
        //   ,
        //   expandIcon: ({ expanded, onExpand, record }) => expanded ? (
        //     <CaretUpOutlined onClick={e => onExpand(record, e)} />
        //   ) : (
        //     <CaretDownOutlined onClick={e => onExpand(record, e)} />
        //   )
        // }}
      >
        {" "}
      </Table>
>>>>>>>> eb4f3dd5ee2eee6edd0d808632bd2f528d45b1b4:src/components/Order/Order-manager/MyOrder.js
    </div>
  );
}

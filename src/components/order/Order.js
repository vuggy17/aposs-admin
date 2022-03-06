import React from "react"
import { useEffect } from "react"

import { Table } from "antd"
import { CaretDownOutlined, CaretUpOutlined } from "@ant-design/icons"

import ProductTable from "components/products/ProductTable"
import { columnsProduct } from "../products/ProductTableCol"

import "./Order.css"

export default function Order() {

  const dataSource = [
    {
      key: 1,
      orderTime: '12:33 10/10/2021',
      name: 'Pham Minh Tan',
      phone: '0343027600',
      address: '696 Hang Bai khu pho 6, phuong Linh Trung, Thu Duc, TPHCM',
      statusOrder: "Pending",
      total: 0,
    },
    {
      key: 2,
      orderTime: '12:33 10/10/2021',
      name: 'Pham Minh Tan',
      phone: '0343027600',
      address: '696 Hang Bai khu pho 6, phuong Linh Trung, Thu Duc, TPHCM',
      statusOrder: "Pending",
      total: 0,
    },
  ];

  const products = [{
    key: 1,
    id: 1,
    img: 'https://pbs.twimg.com/media/FKGerj3XoAcaotk.jpg',
    name: 'Women\'s hoodie',
    color: 'red',
    size: '30',
    amount: '1',
    price: '225 $'
  }, {
    key: 2,
    id: 1,
    img: 'https://pbs.twimg.com/media/FKGerj3XoAcaotk.jpg',
    name: 'Women\'s hoodie',
    color: 'red',
    size: '30',
    amount: '1',
    price: '225 $'
  }, {
    key: 3,
    id: 1,
    img: 'https://pbs.twimg.com/media/FKGerj3XoAcaotk.jpg',
    name: 'Women\'s hoodie',
    color: 'red',
    size: '30',
    amount: '1',
    price: '225 $'
  }, {
    key: 4,
    id: 2,
    img: 'https://pbs.twimg.com/media/FKGerj3XoAcaotk.jpg',
    name: 'Women\'s hoodie',
    color: 'red',
    size: '30',
    amount: '1',
    price: '225'
  },
  ]

  //Calculate total 
  useEffect(() => {
    for (let i = 0; i < dataSource.length; i++) {
      for (let j = 0; j < products.length; j++) {
        if (dataSource[i].key == products[j].id) {
          //if dataSource.total is exists
          if (dataSource[i].total) dataSource = (parseInt(dataSource[i].total) + parseInt(products[j]).price) + ' $'
          else dataSource[i].total = 0;
        }
      }
    }
  },[products])

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
    }
  }

  const columnsOrder = [
    {
      title: 'Order time',
      dataIndex: 'orderTime',
      key: 'orderTime',
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Address',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Status',
      dataIndex: 'statusOrder',
      key: 'statusOrder',
    },
    {
      title: 'Total',
      dataIndex: 'total',
      key: 'total',
    },
    Table.EXPAND_COLUMN,
  ];

  return (
    <div>
      <h1 className="hd__order">My order</h1>
      <Table
        className="tb__order"
        columns={columnsOrder}
        expandable={{
          expandedRowRender: record => {

            return <ProductTable source={(products.filter(product => product.id == record.key)).map(formatProduct)} />
          }
          ,
          expandIcon: ({ expanded, onExpand, record }) => expanded ? (
            <CaretUpOutlined onClick={e => onExpand(record, e)} />
          ) : (
            <CaretDownOutlined onClick={e => onExpand(record, e)} />
          )
        }}

        dataSource={dataSource}
      />
    </div>
  )
};
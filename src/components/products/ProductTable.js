import React from "react";

import { Table } from "antd"

import { columnsProduct } from "./ProductTableCol";
import "./ProductTable.css"

export default function ProductTable(props) {
    return <Table
        className="tb__product"
        dataSource={props.source}
        columns={columnsProduct}
        pagination={{ position: ["none", "none"] }}
    />
}
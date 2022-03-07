import React, { useContext } from "react";

import { Table } from "antd"

import { columnsProduct } from "./ProductTableCol";
import "./ProductTable.css"

export const StorageContext = React.createContext();

export default function ProductTable(props) {



    return <StorageContext.Provider value={100}>
        <Table
            className="tb__product"
            dataSource={props.source}
            columns={columnsProduct}
            pagination={{ position: ["none", "none"] }}
            size="small"
        />
    </StorageContext.Provider>
}
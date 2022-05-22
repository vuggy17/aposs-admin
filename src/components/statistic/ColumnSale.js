import React from "react";
import { Column } from "@ant-design/charts";
import { data } from "./Data";

export default function ColumnSale() {
    const configColumn = {
        data,
        xField: 'type',
        yField: 'value',
    };
    return <Column {...configColumn} />
}
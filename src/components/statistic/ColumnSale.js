import React from "react";
import { Column } from "@ant-design/charts";

export default function ColumnSale({ data }) {
  const configColumn = {
    data,
    xField: "type",
    yField: "value",
  };
  return <Column {...configColumn} />;
}

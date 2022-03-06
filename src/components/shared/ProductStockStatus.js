import { Badge } from "antd";
import React from "react";

export default function ProductStockStatus({ inStock }) {
  return inStock ? (
    <Badge color="blue" text={<span className="text-base ">In stock</span>} />
  ) : (
    <Badge
      color="red"
      text={<span className="text-base ">Out of stock</span>}
    />
  );
}

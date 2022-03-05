import { Breadcrumb } from "antd";
import React from "react";

export default function CustomBreadcrumb({ pages }) {
  return (
    <Breadcrumb>
      {pages?.map(({ url, title }, index) => (
        <Breadcrumb.Item key={index}>
          <a href={url}>{title}</a>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

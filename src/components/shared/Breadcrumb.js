import { Breadcrumb } from "antd";
import React from "react";
import { breadcumbRoutes } from "routes/route.config";
import useBreadcrumbs from "use-react-router-breadcrumbs";
export default function CustomBreadcrumb() {
  const breadcrumbs = useBreadcrumbs(breadcumbRoutes);
  return (
    <Breadcrumb>
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <Breadcrumb.Item key={index}>
          <a href={match.pathname}>{breadcrumb}</a>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

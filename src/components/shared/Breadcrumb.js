import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { breadcumbRoutes } from "routes/route.config";
import useBreadcrumbs from "use-react-router-breadcrumbs";
export default function CustomBreadcrumb() {
  const breadcrumbs = useBreadcrumbs(breadcumbRoutes);
  return (
    <Breadcrumb>
      {breadcrumbs.map(({ match, breadcrumb }, index) => (
        <Breadcrumb.Item key={index}>
          <Link to={match.pathname}>{breadcrumb}</Link>
        </Breadcrumb.Item>
      ))}
    </Breadcrumb>
  );
}

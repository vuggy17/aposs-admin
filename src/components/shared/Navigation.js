import { Menu } from "antd";
import React, { useEffect, useState } from "react";
import {
  AppstoreOutlined,
  BarChartOutlined,
  CloudOutlined,
  ShopOutlined,
  TeamOutlined,
  UserOutlined,
  UploadOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import {
  CATEGORY_MANAGEMENT,
  DEFAULT_ROUTE,
  PRODUCT_MANAGEMENT,
  ORDER_MANAGEMENT,
  routes,
  INDUSTRY_MANAGEMENT,
} from "routes/route.config";

export default function Navigation() {
  const DEFAULT_MENU_ID = DEFAULT_ROUTE;
  const [highlightedMenuId, setHighlightedMenuId] = useState(DEFAULT_MENU_ID);
  const location = useLocation();
  useEffect(() => {
    const pathname = location.pathname.substring(1, location.pathname.length);
    // console.log(pathname);
    // const menuId = routes[pathname]?.toString();
    setHighlightedMenuId(pathname || DEFAULT_MENU_ID);
  }, [location, DEFAULT_MENU_ID]);

  return (
    <>
      <Menu theme="dark" mode="inline" selectedKeys={[highlightedMenuId]}>
        <Menu.Item key={DEFAULT_ROUTE} icon={<UserOutlined />}>
          <Link to={DEFAULT_ROUTE}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key={CATEGORY_MANAGEMENT} icon={<VideoCameraOutlined />}>
          <Link to={CATEGORY_MANAGEMENT}>Categories</Link>
        </Menu.Item>
        <Menu.Item key={PRODUCT_MANAGEMENT} icon={<UploadOutlined />}>
          <Link to={PRODUCT_MANAGEMENT}>Products</Link>
        </Menu.Item>
        <Menu.Item key={ORDER_MANAGEMENT} icon={<BarChartOutlined />}>
          <Link to={ORDER_MANAGEMENT}>Order</Link>
        </Menu.Item>
        <Menu.Item key={INDUSTRY_MANAGEMENT} icon={<CloudOutlined />}>
          <Link to={INDUSTRY_MANAGEMENT}>Industries</Link>
        </Menu.Item>
        <Menu.Item key="6" icon={<AppstoreOutlined />}>
          nav 6
        </Menu.Item>
        <Menu.Item key="7" icon={<TeamOutlined />}>
          nav 7
        </Menu.Item>
        <Menu.Item key="8" icon={<ShopOutlined />}>
          nav 8
        </Menu.Item>
      </Menu>
    </>
  );
}

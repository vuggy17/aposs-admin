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
  HddOutlined,
  SelectOutlined,
  GroupOutlined,
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
        <Menu.Item key={DEFAULT_ROUTE} icon={<BarChartOutlined />}>
          <Link to={DEFAULT_ROUTE}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key={ORDER_MANAGEMENT} icon={<ShopOutlined />}>
          <Link to={ORDER_MANAGEMENT}>Order</Link>
        </Menu.Item>
        <Menu.Item key={PRODUCT_MANAGEMENT} icon={<SelectOutlined />}>
          <Link to={PRODUCT_MANAGEMENT}>Products</Link>
        </Menu.Item>
        <Menu.Item key={CATEGORY_MANAGEMENT} icon={<HddOutlined />}>
          <Link to={CATEGORY_MANAGEMENT}>Categories</Link>
        </Menu.Item>
        <Menu.Item key={INDUSTRY_MANAGEMENT} icon={<GroupOutlined />}>
          <Link to={INDUSTRY_MANAGEMENT}>Industries</Link>
        </Menu.Item>
      </Menu>
    </>
  );
}

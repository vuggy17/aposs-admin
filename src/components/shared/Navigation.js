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
} from "routes/route.config";

export default function Navigation() {
  const DEFAULT_MENU_ID = "1";
  const [highlightedMenuId, setHighlightedMenuId] = useState(DEFAULT_MENU_ID);
  const location = useLocation();
  useEffect(() => {
    const menuId = routes[location.pathname]?.toString();
    setHighlightedMenuId(menuId || DEFAULT_MENU_ID);
  }, [location]);

  return (
    <>
      <Menu theme="dark" mode="inline" selectedKeys={[highlightedMenuId]}>
        <Menu.Item key="1" icon={<UserOutlined />}>
          <Link to={DEFAULT_ROUTE}>Dashboard</Link>
        </Menu.Item>
        <Menu.Item key="2" icon={<VideoCameraOutlined />}>
          <Link to={CATEGORY_MANAGEMENT}>Categories</Link>
        </Menu.Item>
        <Menu.Item key="3" icon={<UploadOutlined />}>
          <Link to={PRODUCT_MANAGEMENT}>Products</Link>
        </Menu.Item>
        <Menu.Item key="4" icon={<BarChartOutlined />}>
        <Link to={ORDER_MANAGEMENT}>Order</Link>
        </Menu.Item>
        <Menu.Item key="5" icon={<CloudOutlined />}>
          nav 5
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

import React from "react";
import {
  Route,
  Navigate,
  useLocation,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { useAuth } from "util/hooks";

import {
  BLOCKED_ACCESS,
  CATEGORY_MANAGEMENT,
  LOGIN,
  PRODUCT_MANAGEMENT,
  ORDER_MANAGEMENT,
} from "./route.config";

import Login from "pages/Login";
import Home from "pages/Home";
import Dashboard from "components/Dashboard";
import Products from "components/products/Products";
import Categories from "components/Categories";
import Order from "components/order/Order"
import Blocked from "pages/Blocked";
import PageNotFound from "pages/PageNotFound";



export default function AppRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* //wraper for all component */}
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path={CATEGORY_MANAGEMENT} element={<Categories />} />
            <Route path={PRODUCT_MANAGEMENT} element={<Products />} />
            <Route path={ORDER_MANAGEMENT} element={<Order />} />
            <Route path={BLOCKED_ACCESS} element={<Blocked />} />
          </Route>
          <Route path={LOGIN} element={<Login />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

const GuardedRoute = ({ children }) => {
  const { location } = useLocation();
  const { auth } = useAuth();
  // const { token } = useAuth();
  //TODO: implement useAuth
  return auth ? (
    children
  ) : (
    <Navigate to={LOGIN} state={{ from: location }} replace />
  );
};

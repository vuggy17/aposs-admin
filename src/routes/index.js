import Category from "components/Categories/Category";
import Categories from "components/Categories/MyCategories";
import Dashboard from "components/Dashboard/MyDashboard";
import Industries from "components/industries/MyIndustries";
import Order from "components/Order/Order-manager/Order";
import OrderDetail from "components/Order/Order-detail/OrderDetail";
import CreateProduct from "components/products/CreateProduct";
import EditProduct from "components/products/EditProduct";
import Products from "components/products/MyProducts";
import Blocked from "pages/Blocked";
import Home from "pages/Home";
import Loading from "pages/Loading";
import Login from "pages/Login";
import PageNotFound from "pages/PageNotFound";
import React from "react";
import {
  Route,
  Navigate,
  useLocation,
  Routes,
  BrowserRouter,
} from "react-router-dom";
import { useAuth } from "util/hooks/useAuth";

import {
  BLOCKED_ACCESS,
  CATEGORY_MANAGEMENT,
  LOGIN,
  PRODUCT_MANAGEMENT,
  ORDER_MANAGEMENT,
  WORKSPACE,
  NEW_PRODUCT,
  EDIT_PRODUCT,
  INDUSTRY_MANAGEMENT,
  CATEGORY_DETAIL,
  EDIT_PRODUCT_FROM_CATEGORY,
  ADD_PRODUCT_FROM_CATEGORY,
} from "./route.config";

// import Workspace from "components/dashboard/Workspace";
export default function AppRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* //wraper for all component */}
          <Route path="/" element={<Home />}>
            <Route index element={<Dashboard />} />
            <Route path={CATEGORY_MANAGEMENT} element={<Categories />} />
            <Route path={CATEGORY_DETAIL} element={<Category />} />
            <Route path={INDUSTRY_MANAGEMENT} element={<Industries />} />
            <Route path={PRODUCT_MANAGEMENT} element={<Products />} />
            <Route path={NEW_PRODUCT} element={<CreateProduct />} />
            <Route path={EDIT_PRODUCT} element={<EditProduct />} />
            <Route
              path={EDIT_PRODUCT_FROM_CATEGORY}
              element={<EditProduct />}
            />
            <Route
              path={ADD_PRODUCT_FROM_CATEGORY}
              element={<CreateProduct />}
            />
            <Route path={ORDER_MANAGEMENT} element={<Order />} />
            <Route path={`${ORDER_MANAGEMENT}/:orderId`} element={<OrderDetail />} />
            <Route path={BLOCKED_ACCESS} element={<Blocked />} />
            {/* <Route path={WORKSPACE} element={<Workspace />} /> */}
            <Route path="test" element={<Loading />} />
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

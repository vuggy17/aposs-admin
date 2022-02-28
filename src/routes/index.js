import Blocked from "pages/Blocked";
import Home from "pages/Home";
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
import { useAuth } from "util/hooks";

import { BLOCKED_ACCESS, LOGIN, PAGE_NOT_FOUND } from "./route.config";

export default function AppRoute() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          {/* //wraper for all component */}
          <Route
            path="/"
            element={
              <GuardedRoute>
                <Home />
              </GuardedRoute>
            }
          ></Route>
          <Route path={LOGIN} element={<Login />} />
          <Route path={BLOCKED_ACCESS} element={<Blocked />} />
          <Route path={PAGE_NOT_FOUND} element={<PageNotFound />} />
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

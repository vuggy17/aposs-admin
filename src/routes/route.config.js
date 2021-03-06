export const BLOCKED_ACCESS = "access-blocked";
export const LOGIN = "login";
export const CATEGORY_MANAGEMENT = "categories";
export const INDUSTRY_MANAGEMENT = "industries";
export const PRODUCT_MANAGEMENT = "products";
export const ORDER_MANAGEMENT = "order";
export const ORDER_DETAIL = `/order/:orderId`;
export const DEFAULT_ROUTE = "/";
export const WORKSPACE = "workspace";
export const NEW_PRODUCT = `/${PRODUCT_MANAGEMENT}/new`;
export const EDIT_PRODUCT = `/${PRODUCT_MANAGEMENT}/:productName`;
export const CATEGORY_DETAIL = `/${CATEGORY_MANAGEMENT}/:categoryName`;
export const EDIT_PRODUCT_FROM_CATEGORY = `${CATEGORY_MANAGEMENT}/:categoryName/:productName`;
export const ADD_PRODUCT_FROM_CATEGORY = `${CATEGORY_MANAGEMENT}/:categoryName/new-product`;

// Add new route here for menu lighting when navigating in browser
export const routes = {
  [DEFAULT_ROUTE]: 1,
  [CATEGORY_MANAGEMENT]: 2,
  [PRODUCT_MANAGEMENT]: 3,
  [ORDER_MANAGEMENT]: 4,
  [INDUSTRY_MANAGEMENT]: 5,
};

// use DynamicBreadcrumb to render route with custom prop, ex: /category/:categoryId
export const breadcumbRoutes = [
  { path: DEFAULT_ROUTE, breadcrumb: "Home" },
  { path: CATEGORY_MANAGEMENT, breadcrumb: "Categories" },
  { path: PRODUCT_MANAGEMENT, breadcrumb: "Products" },
  { path: ORDER_MANAGEMENT, breadcrumb: "Orders" },
  { path: INDUSTRY_MANAGEMENT, breadcrumb: "Industries" },
  {
    path: CATEGORY_DETAIL,
    breadcrumb: (props) => DynamicBreadcrumb(props, "categoryName"),
  },
  {
    path: EDIT_PRODUCT,
    breadcrumb: (props) => DynamicBreadcrumb(props, "productName"),
  },
  {
    path: ADD_PRODUCT_FROM_CATEGORY,
    breadcrumb: "Add",
  },
  {
    path: EDIT_PRODUCT_FROM_CATEGORY,
    breadcrumb: (props) => DynamicBreadcrumb(props, "productName"),
  },
];

const DynamicBreadcrumb = ({ match }, propName) => {
  return match.params[propName];
};

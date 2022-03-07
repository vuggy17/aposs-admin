export const BLOCKED_ACCESS = "access-blocked";
export const LOGIN = "login";
export const CATEGORY_MANAGEMENT = "categories";
export const INDUSTRY_MANAGEMENT = "industries";
export const PRODUCT_MANAGEMENT = "products";
export const ORDER_MANAGEMENT = "order";
export const DEFAULT_ROUTE = "/";
export const WORKSPACE = "workspace";
export const NEW_PRODUCT = `/${PRODUCT_MANAGEMENT}/new`;
export const EDIT_PRODUCT = `/${PRODUCT_MANAGEMENT}/:productId`;
export const CATEGORY_DETAIL = `/${CATEGORY_MANAGEMENT}/:categoryId`;

// Add new route here for menu lighting when navigating in browser
export const routes = {
  [DEFAULT_ROUTE]: 1,
  [CATEGORY_MANAGEMENT]: 2,
  [PRODUCT_MANAGEMENT]: 3,
  [ORDER_MANAGEMENT]: 4,
  [INDUSTRY_MANAGEMENT]: 5,
};

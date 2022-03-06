export const formatPrice = (value, prefix = "VND") =>
  value?.toLocaleString("it-IT", { style: "currency", currency: prefix });

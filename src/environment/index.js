import { dev_evironment } from "./dev";
import { prod_evironment } from "./prod";

function getEnvironment() {
  const platform = process.env.NODE_ENV;
  if (platform === "production") {
    return prod_evironment;
  }
  return dev_evironment;
}

let Environment = getEnvironment();

export default Environment;

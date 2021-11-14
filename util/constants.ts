export const isProd = process.env.NODE_ENV === "production";

//  TODO
//  Replace with API EC2 Host Address
// export const API_DOMAIN = isProd
//   ? "https://api.xodius.io"
//   : "http://localhost:8383";
export const API_DOMAIN = isProd
  ? "https://api.xodius.io"
  : "https://api.xodius.io";

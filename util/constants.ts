export const isProd = process.env.NODE_ENV === "production";

//  TODO
//  Replace with API EC2 Host Address
export const API_DOMAIN = isProd ? "1.1.1.1" : "http://localhost:3000";

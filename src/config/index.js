import "dotenv/config";

export default {
  env: process.env.NODE_ENV || "development",
  jwtSecret: process.env.JWT_SECRET,
  port: process.env.PORT || 5000,
  api: {
    prefix: "/api/v1",
  },
};

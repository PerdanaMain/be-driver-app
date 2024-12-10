const env = process.env.NODE_ENV || "development";

export default {
  env,
  port: process.env.PORT || 5000,
  api: {
    prefix: "/api/v1",
  },
};

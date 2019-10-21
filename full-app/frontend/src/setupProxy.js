const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/users",
    proxy({
      target: "http://localhost:4000",
      changeOrigin: true
    })
  );
  app.use(
    "/api",
    proxy({
      target: "http://localhost:4000",
      changeOrigin: true
    })
  );
};
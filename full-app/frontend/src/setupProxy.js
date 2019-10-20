const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/users",
    proxy({
      target: "http://localhost:4000",
      changeOrigin: true
    })
  );
};
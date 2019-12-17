const proxy = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/rest",
    proxy({
      target: "http://localhost:4000",
      changeOrigin: true
    })
  );
  app.use(
    "/version",
    proxy({
      target: "http://localhost:4000",
      changeOrigin: true
    })
  );
  app.use(
    "/auth",
    proxy({
      target: "http://localhost:8080",
      changeOrigin: true,
      onProxyReq: (proxyReq, req, res) => {
        console.log(proxyReq);
        console.log(req);
        console.log(res);
      }/*,
      cookieDomainRewrite: {
        "localhost:3000": "localhost:3000",
        "127.0.0.1:3000": "localhost:3000",
        "127.0.0.1:8080": "localhost:3000",
        "*": ""
      }*/
    })
  );
};
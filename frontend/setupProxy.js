const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = function (app) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://localhost:8080", // Replace with your Django server URL
      changeOrigin: true,
      secure: false,
    })
  );
};

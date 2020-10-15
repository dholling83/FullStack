const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/todos","/todo"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );

  app.use(
    ["/todos/:id"],
    createProxyMiddleware({
      target: "http://localhost:5000",
    })
  );
};
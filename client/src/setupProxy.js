const { createProxyMiddleware } = require("http-proxy-middleware");
module.exports = function (app) {
  app.use(
    ["/todo"],
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
  // app.use(
  //   "/todos/*",
  //   createProxyMiddleware({
  //     target: "http://localhost:5000"
  //   })
  // );
};
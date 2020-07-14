const jsonServer = require("json-server");
const express = require("express");
const path = require("path");

const root = __dirname + "/build";
const port = process.env.LEANCLOUD_APP_PORT || 3000;

const server = jsonServer.create();
const middleware = jsonServer.defaults();
const reactRouterWhiteList = ["/create", "/edit/:itemID"];
server.get(reactRouterWhiteList, (req, res) => {
  res.sendFile(path.resolve(root, "index.html"));
});
const router = jsonServer.router("db.json");
server.use(express.static(root, { maxAge: 86400000 }));
server.use(middleware);
server.use(router);

server.listen(port, () => {
  console.log("server is running on PORT: 3000");
});

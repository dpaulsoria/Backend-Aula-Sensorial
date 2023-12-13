const express = require("express");
const WebSocket = require("ws");

const router = express.Router();
const wss = new WebSocket.Server({ noServer: true });

wss.on("connection", (ws) => {
  console.log("Cliente conectado al WebSocket");

  ws.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
    ws.send("Mensaje recibido en el servidor");
  });

  ws.on("close", () => {
    console.log("Cliente desconectado del WebSocket");
  });
});

router.ws("/", (ws, req) => {
  wss.handleUpgrade(req, ws, (socket) => {
    wss.emit("connection", socket, req);
  });
});

module.exports = router;

// responseWebSocketMiddleware.js

const WebSocket = require("ws");
const wsServer = require("../webSocket"); // Importa tu servidor WebSocket

function websocketMiddleware(req, res, next) {
  res.on("finish", () => {
    // Captura el cuerpo completo de la respuesta
    // TODO no responde el cuerpo de la peticion
    const chunks = []; // Almacena los fragmentos del cuerpo de la respuesta

    // Intercepta los fragmentos de datos del cuerpo de la respuesta
    const originalWrite = res.write;
    res.write = function (chunk) {
      chunks.push(chunk);
      return originalWrite.apply(res, arguments);
    };

    const responseBody = Buffer.concat(chunks).toString("utf8");

    const message = {
      route: req.baseUrl,
      body: responseBody,
    };

    if (wsServer.clients.size > 0) {
      wsServer.clients.forEach((client) => {
        if (client.readyState === WebSocket.OPEN) {
          client.send(JSON.stringify(message));
        }
      });
    }
  });

  next();
}

module.exports = websocketMiddleware;

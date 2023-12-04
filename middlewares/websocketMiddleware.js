// responseWebSocketMiddleware.js

const WebSocket = require("ws");
const wsServer = require("../webSocket"); // Importa tu servidor WebSocket

function websocketMiddleware(req, res, next) {
  try {
    if (wsServer.clients.size > 0) {
      const oldWrite = res.write;
      const oldEnd = res.end;

      const chunks = [];

      res.write = function (chunk) {
        chunks.push(chunk);
        oldWrite.apply(res, arguments);
      };

      let message;

      res.end = function (chunk) {
        if (chunk) {
          chunks.push(chunk);
        }

        const responseBody = Buffer.concat(chunks).toString("utf8");

        message = {
          route: req.baseUrl,
          body: responseBody,
        };

        wsServer.clients.forEach((client) => {
          if (client.readyState === WebSocket.OPEN) {
            client.send(JSON.stringify(message));
          }
        });

        oldEnd.apply(res, arguments);
      };
    }
  } catch (error) {
    console.error(error);
  }

  next();
}

module.exports = websocketMiddleware;

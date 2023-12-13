const WebSocket = require("ws");
const wsPort = process.env.WS_PORT || 4000; // Puerto para el servidor WebSocket
const wsServer = new WebSocket.Server({ port: wsPort });

wsServer.on("connection", (socket) => {
  console.log("Cliente conectado al servidor WebSocket");

  // Manejar mensajes recibidos del cliente WebSocket
  socket.on("message", (message) => {
    console.log(`Mensaje recibido: ${message}`);
    // Puedes procesar el mensaje o enviar una respuesta al cliente
  });

  // Manejar cierre de conexión
  socket.on("close", () => {
    console.log("Cliente desconectado");
  });
});

// Manejar errores en el servidor WebSocket
wsServer.on("error", (error) => {
  console.error("Error en el servidor WebSocket:", error);
});
module.exports = wsServer;

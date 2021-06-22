const WebSocket = require("ws");
const { v1: uuidv1, v4: uuidv4 } = require("uuid");

const wss = new WebSocket.Server({
  port: 13637,
});

function noop() {}

function heartbeat() {
  this.isAlive = true;
}

wss.on("connection", (ws) => {
  ws.isAlive = true;
  ws.on("pong", heartbeat);

  let uuid = uuidv4();
  ws.uuid = uuid;
  ws.send(JSON.stringify({ type: "open", uuid: uuid }));

  ws.on("close", () => {
    wss.clients.delete(ws);
    wss.clients.forEach((client) => {
      if (client.readyState === WebSocket.OPEN) {
        client.send(
          JSON.stringify({
            type: "removePlayer",
            uuid: ws.uuid,
          })
        );
      }
    });
  });

  ws.on("message", (message) => {
    let json = JSON.parse(message);
    ws.player = json.player;
    switch (json.type) {
      case "open":
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "newPlayer",
                player: json.player,
                uuid: uuid,
              })
            );

            ws.send(
              JSON.stringify({
                type: "newPlayer",
                player: client.player,
                uuid: client.uuid,
              })
            );
          }
        });
        break;

      case "playerMove":
        ws.player = json.player;
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "playerMove",
                player: json.player,
                uuid: ws.uuid,
              })
            );
          }
        });
        break;
      case "playerShoot":
        wss.clients.forEach((client) => {
          if (client !== ws && client.readyState === WebSocket.OPEN) {
            client.send(
              JSON.stringify({
                type: "playerShoot",
                bullet: json.bullet,
              })
            );
          }
        });
        break;

      default:
        break;
    }
  });
});

const interval = setInterval(function ping() {
  wss.clients.forEach((ws) => {
    if (ws.isAlive === false) {
      return ws.terminate();
    }

    ws.isAlive = false;
    ws.ping(noop);
  });
}, 30000);

wss.on("close", function close() {
  clearInterval(interval);
});

console.log("Listening..");

import Emitter from "../../utils/Emitter.js";
//TODO decide on what to use, either JSON or binary stuff, preferably JSON since the Websocket server currently in js also uses that

//TODO do we want to use addEventListener type of stuff? It's easy to use and stuff
export default class Client extends Emitter {
  constructor() {
    super();
    this.connect();
  }

  connect() {
    let _this = this;
    this.ws = new WebSocket("wss://192.168.11.18:13637"); // Change url when server is up

    this.ws.addEventListener("error", (e) => {});

    this.ws.addEventListener("open", (e) => {});

    this.ws.addEventListener("message", (e) => {
      let json = JSON.parse(e.data);
      switch (json.type) {
        case "open": {
          let customEvent = new CustomEvent("open", {
            detail: { uuid: json.uuid },
          });
          _this.dispatchEvent(customEvent);
          break;
        }
        case "startGame": {
          let customEvent = new CustomEvent("startGame");
          _this.dispatchEvent(customEvent);
          break;
        }
        case "playerMove": {
          let customEvent = new CustomEvent("playerMove", {
            detail: { player: json.player, uuid: json.uuid },
          });
          _this.dispatchEvent(customEvent);
          break;
        }
        case "playerShoot": {
          let customEvent = new CustomEvent("playerShoot", {
            detail: { bullet: json.bullet },
          });
          _this.dispatchEvent(customEvent);

          break;
        }
        case "newPlayer": {
          let customEvent = new CustomEvent("newPlayer", {
            detail: { player: json.player, uuid: json.uuid },
          });
          _this.dispatchEvent(customEvent);
          break;
        }
        case "removePlayer": {
          let customEvent = new CustomEvent("removePlayer", {
            detail: { uuid: json.uuid },
          });
          _this.dispatchEvent(customEvent);
          break;
        }
      }
    });

    this.ws.addEventListener("close", (e) => {
      _this.connect();
    });
  }

  sendPlayer(game) {
    if (this.ws.readyState === WebSocket.OPEN && game.uuid != null) {
      this.ws.send(
        JSON.stringify({
          type: "playerMove",
          player: {
            velocityX: game.player.direction.x,
            velocityY: game.player.direction.y,
            x: game.player.position.x,
            y: game.player.position.y,
            playerClassName: game.player.classType.className,
            frames: game.frames,
          },
          uuid: game.uuid,
        })
      );
    }
  }

  sendOpen(game) {
    if (this.ws.readyState === WebSocket.OPEN && game.uuid != null) {
      this.ws.send(
        JSON.stringify({
          type: "open",
          player: {
            x: game.player.position.x,
            y: game.player.position.y,
            playerClassName: game.player.classType.className,
            frames: game.frames,
          },
          uuid: game.uuid,
        })
      );
    }
  }

  sendBullet(game, bullet) {}
}

import Stats from "../utils/Stats.js";
import Map from "../map/Map.js";
import Camera from "./Camera.js";
import Player from "./Player.js";
import Keyboard from "./GUI/Keyboard.js";
import Joystick from "./GUI/Joystick.js";
import Client from "./networking/Client.js";
import Entity from "./Entity.js";
import Rogue from "./classes/Rogue.js";
import Defiler from "./classes/Defiler.js";
import Magician from "./classes/Magician.js";
import Panzer from "./classes/Panzer.js";
import Underpinner from "./classes/Underpinner.js";
import Curativer from "./classes/Curativer.js";
import Button from "./GUI/Button.js";

export default class Game {
  constructor(canvas, ctx, classType) {
    this.frames = 0;
    this.map = new Map();
    this.stats = new Stats();
    this.player = new Player(classType, 32, 32);

    this.bulletMap = [];
    this.players = {};

    this.canvas = canvas;
    this.ctx = ctx;

    this.camera = new Camera();
    this.camera.visibleX = 18 * 32;
    this.camera.visibleY = 5 * 32;
    this.camera.fov.height = 8 * 32; //27 * 32;//15 * 32;
    this.camera.fov.width = 18 * 32; //48*32;//26 * 32; //almost

    this.moveController = this.hasTouch()
      ? new Joystick(100, canvas.height - 100, 50)
      : new Keyboard();

    this.fsButton = new Button(canvas.width - 100, 100, 40);
    this.fsButton.addEventListener("click", async () => {
      //
    });

    let _this = this;
    this.client = new Client();
    this.client.addEventListener("open", (e) => {
      _this.uuid = e.detail.uuid;
      _this.client.sendOpen(_this);
    });
    this.client.addEventListener("startGame", (e) => {});
    this.client.addEventListener("playerMove", (e) => {
      if (e.detail.uuid in _this.players)
        _this.players[e.detail.uuid].updateNetwork(e.detail.player);
    });
    this.client.addEventListener("playerShoot", (e) => {
      _this.bulletMap.push(e.detail.bullet);
    });
    this.client.addEventListener("newPlayer", async (e) => {
      switch (e.detail.player.playerClassName) {
        case "Defiler":
          _this.players[e.detail.uuid] = new Entity(
            new Defiler(),
            e.detail.player.x,
            e.detail.player.y
          );
          break;

        case "Rogue":
          _this.players[e.detail.uuid] = new Entity(
            new Rogue(),
            e.detail.player.x,
            e.detail.player.y
          );
          break;

        case "Magician":
          _this.players[e.detail.uuid] = new Entity(
            new Magician(),
            e.detail.player.x,
            e.detail.player.y
          );
          break;

        case "Panzer":
          _this.players[e.detail.uuid] = new Entity(
            new Panzer(),
            e.detail.player.x,
            e.detail.player.y
          );
          break;

        case "Underpinner":
          _this.players[e.detail.uuid] = new Entity(
            new Underpinner(),
            e.detail.player.x,
            e.detail.player.y
          );
          break;

        case "Curativer":
          _this.players[e.detail.uuid] = new Entity(
            new Curativer(),
            e.detail.player.x,
            e.detail.player.y
          );
          break;
      }

      await _this.players[e.detail.uuid].init();
    });

    this.client.addEventListener("removePlayer", (e) => {
      delete _this.players[e.detail.uuid];
    });
  }

  async init(mapName) {
    await this.map.init(mapName);
    await this.player.init();
    this.fsButton.init(this.canvas);
    this.moveController.init(this.canvas);
    window.oldTS = -1;
    window.continue = true;
    var _update = (ts) => {
      if (oldTS == -1) {
        this.update(0);
        oldTS = 0;
      } else {
        this.update((ts - oldTS) / 1000); //To seconds
        oldTS = ts;
      }
      if (window.continue) requestAnimationFrame(_update);
    };
    _update();
  }

  collide(oldPos, newPos, layer) {}

  center() {
    this.camera.visibleX = this.player.position.x - this.camera.fov.width / 2;
    this.camera.visibleY = this.player.position.y - this.camera.fov.height / 2;

    if (this.camera.visibleX < 0) {
      this.camera.visibleX = 0;
    } else if (
      this.camera.visibleX + this.camera.fov.width >
      this.map.mapData.width * 32
    ) {
      this.camera.visibleX =
        this.map.mapData.width * 32 - this.camera.fov.width;
    }

    if (this.camera.visibleY < 0) {
      this.camera.visibleY = 0;
    } else if (
      this.camera.visibleY + this.camera.fov.height >
      this.map.mapData.height * 32
    ) {
      this.camera.visibleY =
        this.map.mapData.height * 32 - this.camera.fov.height;
    }
  }

  update(time) {
    this.frames++;
    this.stats.begin();
    this.map.update(this, time);
    this.player.setVelocity(this.moveController.getVector2());
    this.center();

    this.bulletMap = this.bulletMap.filter(
      (bullet) =>
        bullet.update(this, time) &&
        bullet.isAlive() &&
        bullet.position.x < this.map.width &&
        bullet.position.x > 0 &&
        bullet.position.y < this.map.height &&
        bullet.position.y > 0
    );

    this.player.update(this, time);
    Object.values(this.players).forEach((player) => player.update(this, time));

    this.draw();
    this.stats.end();

    this.ctx.textAlign = "left";
    this.ctx.fillStyle = "#ff0000";
    this.ctx.fillText(
      `FPS: ${Math.ceil(this.stats.fps)} MS: ${Math.floor(this.stats.frameMS)}`,
      10,
      20
    );

    if (this.frames % 6 == 0) {
      this.client.sendPlayer(this);
    }
  }

  hasTouch() {
    return (
      "ontouchstart" in document.documentElement && "ontouchstart" in window
    ); //use window instead?? TODO
  }

  draw() {
    this.ctx.save();
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    const buffer = document.createElement("canvas");
    const bufferCtx = buffer.getContext("2d");
    buffer.width = this.camera.fov.width;
    buffer.height = this.camera.fov.height;
    this.map.drawBackground(bufferCtx, this);

    let hRatio = this.canvas.width / buffer.width;
    let vRatio = this.canvas.height / buffer.height;
    let ratio = Math.min(hRatio, vRatio);
    let centerX = 0;
    let centerY = 0;
    if (hRatio > vRatio) {
      centerX = (this.canvas.width - buffer.width * ratio) / 2;
    } else {
      centerY = (this.canvas.height - buffer.height * ratio) / 2;
    }

    Object.values(this.players).forEach((player) =>
      !player.invisible ? player.draw(bufferCtx, this) : 0
    );
    this.player.draw(bufferCtx, this);
    this.bulletMap.forEach((bullet) => bullet.draw(bufferCtx, this));
    //draw players

    this.map.drawForeground(bufferCtx, this);
    this.ctx.drawImage(
      buffer,
      0,
      0,
      buffer.width,
      buffer.height,
      centerX,
      centerY,
      buffer.width * ratio,
      buffer.height * ratio
    );
    this.moveController.draw(this.ctx);
    this.fsButton.draw(this.ctx);

    this.player.drawHealthBar(
      this.ctx,
      this.canvas.width * (9 / 10),
      this.canvas.height * (1 / 10),
      (this.player.health / this.player.classType.maxHealth) * 100,
      this.canvas.width * (1 / 10),
      15
    );
    this.ctx.restore();
  }
}

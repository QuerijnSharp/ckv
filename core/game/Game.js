import Stats from "../utils/Stats.js";
import Map from "../map/Map.js";
import Camera from "./Camera.js";
import Player from "./Player.js";
import Keyboard from "./GUI/Keyboard.js";

export default class Game {
  constructor(canvas, ctx, classType) {
    this.map = new Map();
    this.stats = new Stats();
    this.player = new Player(classType, 32, 32);

    this.bulletMap = [];
    this.players = [];

    this.canvas = canvas;
    this.ctx = ctx;

    this.camera = new Camera();
    this.camera.visibleX = 3 * 128;
    this.camera.visibleY = 5 * 64;
    this.camera.fov.height = 6 * 64; //27 * 32;//15 * 32;
    this.camera.fov.width = 7 * 128; //48*32;//26 * 32; //almost

    this.moveController = new Keyboard();
  }

  async init(mapName) {
    await this.map.init(mapName);
    await this.player.init();
    this.moveController.init(this.canvas);
    window.oldTS = -1;
    var _update = (ts) => {
      if (oldTS == -1) {
        this.update(0);
        oldTS = 0;
      } else {
        this.update((ts - oldTS) / 1000); //To seconds
        oldTS = ts;
      }
      requestAnimationFrame(_update);
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
    this.stats.begin();
    this.map.update(this, time);
    this.player.setVelocity(this.moveController.getVector2());
    this.center();

    this.bulletMap.forEach((bullet) => bullet.update(this, time));

    this.player.update(this, time);
    this.players.forEach((player) => player.update(this, time));

    this.bulletMap = this.bulletMap.filter(
      (bullet) =>
        bullet.x < this.map.width &&
        bullet.x > 0 &&
        bullet.y < this.map.height &&
        bullet.y > 0
    );

    this.draw();
    this.stats.end();

    this.ctx.textAlign = "left";
    this.ctx.fillStyle = "#ff0000";
    this.ctx.fillText(
      `FPS: ${Math.ceil(this.stats.fps)} MS: ${Math.floor(this.stats.frameMS)}`,
      10,
      20
    );
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

    this.player.draw(bufferCtx, this);
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
    this.ctx.restore();
  }
}

import Direction from "./Direction.js";
import Vector2 from "../math/Vector2.js";
import Animation from "../utils/Animation.js";
import { loadImage } from "../utils/loaders.js";
import LayerType from "../map/LayerType.js";

export default class Entity {
  constructor(classType, x, y) {
    this.classType = classType;
    this.shooting = false;
    this.invisible = false;

    this.position = new Vector2(x, y);

    this.velocity = 48 * 4; //In pixels / second

    this.direction = new Vector2(0, 0);
    this.facingDirection = Direction.UP;
    this.animation = new Animation(5, { pattern: [0, 1, 0, 2], index: 0 });
  }

  async init() {
    this.spriteSheet = await loadImage(
      `./assets/Classes/${this.classType.className}.png`
    );
  }

  update(game, time) {
    let oldPosition = this.position.copy();
    this.position.add(this.direction.multiply2(this.velocity * time));
    for (let layer of game.map.layers) {
      if (layer.layerType == LayerType.Collision) {
        game.map.blockCollision(oldPosition, this.position, layer);
      }
    }
    this.animation.update(time);

    if (this.direction.y != 0 || this.direction.x != 0) {
      if (
        this.direction.y >= this.direction.x &&
        this.direction.y >= -this.direction.x
      ) {
        this.facingDirection = Direction.DOWN;
      } else if (
        this.direction.y <= this.direction.x &&
        this.direction.y <= -this.direction.x
      ) {
        this.facingDirection = Direction.UP;
      } else if (
        this.direction.x >= this.direction.y &&
        this.direction.x >= -this.direction.y
      ) {
        this.facingDirection = Direction.RIGHT;
      } else if (
        this.direction.x <= this.direction.y &&
        this.direction.x <= -this.direction.y
      ) {
        this.facingDirection = Direction.LEFT;
      }
      this.moving = true;
    } else {
      this.moving = false;
    }
  }

  updateNetwork(player) {
    if (player.oldFrames != null && this.oldFrames <= player.frames) return;
    this.oldFrames = player.frames;
    this.position = new Vector2(player.x, player.y);
    this.setVelocity(new Vector2(player.velocityX, player.velocityY));
  }

  setVelocity(direction) {
    this.direction = direction;
  }

  draw(ctx, game) {
    if (
      this.position.x == NaN ||
      this.position.y == NaN ||
      this.spriteSheet == null
    )
      return;
    let visible = this.position.add2(
      new Vector2(-game.camera.visibleX, -game.camera.visibleY)
    );

    ctx.save();
    if (this.moving) {
      ctx.shadowColor = "rgba(0,0,0,1)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.drawImage(
        this.spriteSheet,
        this.animation.getCurrentFrame() * 32,
        this.facingDirection * 32,
        32,
        32,
        visible.x,
        visible.y,
        32,
        32
      );
    } else {
      ctx.shadowColor = "rgba(0,0,0,1)";
      ctx.shadowBlur = 5;
      ctx.shadowOffsetX = 2;
      ctx.shadowOffsetY = 2;
      ctx.drawImage(
        this.spriteSheet,
        32,
        this.facingDirection * 32,
        32,
        32,
        visible.x,
        visible.y,
        32,
        32
      );
    }
    ctx.restore();
  }
}

import LayerType from "../map/LayerType.js";
import Vector2 from "../math/Vector2.js";

export default class Bullet {
  constructor(
    buffer,
    x,
    y,
    directionX,
    directionY,
    velocity,
    lifeTime,
    rotationSpeed
  ) {
    this.buffer = buffer;
    this.originalPosition = new Vector2(x, y);
    this.position = new Vector2(x, y);
    this.direction = new Vector2(directionX, directionY); //normalize this vector / angle??
    this.velocity = velocity;
    this.lifeTime = lifeTime;

    this.angle = 0;
    this.rotationSpeed = rotationSpeed;
  }

  update(game, time) {
    let oldPosition = this.position.copy();
    this.position.add(this.direction.multiply2(this.velocity * time));
    this.angle += this.rotationSpeed * time;
    for (let layer of game.map.layers) {
      if (layer.layerType == LayerType.Collision) {
        game.map.blockCollision(oldPosition, this.position, layer);
        if (
          this.position.x == oldPosition.x &&
          this.position.y == oldPosition.y
        ) {
          return false;
        }
      }
    }
    return true;
  }

  draw(ctx, game) {
    let visible = this.position.add2(
      new Vector2(-game.camera.visibleX, -game.camera.visibleY)
    );

    ctx.save();
    ctx.translate(
      visible.x + this.buffer.width / 2,
      visible.y + this.buffer.height / 2
    );
    ctx.rotate(this.angle);
    ctx.drawImage(
      this.buffer,
      0,
      0,
      this.buffer.width,
      this.buffer.height,
      -this.buffer.width / 2,
      -this.buffer.height / 2,
      this.buffer.width,
      this.buffer.height
    );
    ctx.restore();
  }

  isAlive() {
    return this.position.distance(this.originalPosition) <= this.lifeTime;
  }

  isColliding() {
    for (let layer of game.map.layers) {
      if (layer.layerType == LayerType.Collision) {
        game.map.blockCollision(oldPosition, this.position, layer);
      }
    }
  }
}

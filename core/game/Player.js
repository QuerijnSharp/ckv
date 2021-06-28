import Vector2 from "../math/Vector2.js";
import Bullet from "./Bullet.js";
import Entity from "./Entity.js";

export default class Player extends Entity {
  //should probably add all the easy to access properties such as cursor position, ability presses / yes or true for the ability stuff
  //TODO
  constructor(classType, x, y) {
    super(classType, x, y);
    this.time = 0;

    classType.init(this);
  }

  update(game, time) {
    super.update(game, time);
    this.time += time;

    if (this.classType.dexterity < this.time && this.bulletImage != null) {
      this.time = 0;

      if (this.direction.x != 0 || this.direction.y != 0) {
        let bullet = new Bullet(
          this.bulletImage,
          this.position.x + 16 - this.bulletImage.width / 2,
          this.position.y + 16 - this.bulletImage.height / 2,
          this.direction.x,
          this.direction.y,
          this.classType.bulletSettings.velocity,
          this.classType.bulletSettings.lifeTime,
          5
        );
        game.bulletMap.push(bullet);

        game.client.sendBullet(game, bullet);
      }
    }

    if (
      this.health < this.classType.maxHealth &&
      this.direction.x == 0 &&
      this.direction.y == 0
    ) {
      this.health += 2;
    } else if (this.direction.x != 0 || this.direction.y != 0) {
      this.health -= 0.25;
    }

    if (this.health < 0) {
      window.continue = false;
      location.reload();
    }
  }

  draw(ctx, game) {
    //draw player sprite
    super.draw(ctx, game);
  }

  drawHealthBar(ctx, x, y, percentage, width, thickness) {
    ctx.save();
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.rect(x - width / 2, y, width, thickness);
    ctx.fillStyle = "gray";
    ctx.closePath();
    ctx.fill();
    ctx.restore();

    ctx.save();
    ctx.globalAlpha = 0.75;
    ctx.beginPath();
    ctx.rect(x - width / 2, y, width * (percentage / 100), thickness);
    if (percentage > 63) {
      ctx.fillStyle = "green";
    } else if (percentage > 37) {
      ctx.fillStyle = "gold";
    } else if (percentage > 13) {
      ctx.fillStyle = "orange";
    } else {
      ctx.fillStyle = "red";
    }
    ctx.closePath();
    ctx.fill();
    ctx.restore();
  }
}

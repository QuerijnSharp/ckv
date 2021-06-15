import Vector2 from "../math/Vector2.js";
import Entity from "./Entity.js";

export default class Player extends Entity {
  //should probably add all the easy to access properties such as cursor position, ability presses / yes or true for the ability stuff
  //TODO
  constructor(classType, x, y) {
    super(classType, x, y);
  }

  update(game, time) {
    super.update(game, time);
    this.frame += 1; //TODO
  }

  draw(ctx, game) {
    //draw player sprite
    super.draw(ctx, game);
  }
}

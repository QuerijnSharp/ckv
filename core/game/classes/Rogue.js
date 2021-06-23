import Invisible from "../abilities/Invisible.js";
import Teleport from "../abilities/Teleport.js";

export default class Rogue {
  constructor() {
    this.bulletSettings = {
      velocity: 48 * 8,
      lifeTime: 32 * 16,
    };
    this.dexterity = 0.25; // shots per second
    this.maxHealth = 400;
    this.className = "Rogue";
    this.classType = "dps";
    //init with player etc
    this.abilities = [];
    this.abilities.push(new Invisible());
    this.abilities.push(new Teleport());
  }

  init(player) {
    this.player = player;
    this.player.velocity = 48 * 6;
    this.player.health = this.maxHealth;
  }

  update(player) {
    if (player.direction.x == 0 && player.direction.y == 0) {
      player.invisible = true;
    } else {
      player.invisible = false;
    }
  }
}

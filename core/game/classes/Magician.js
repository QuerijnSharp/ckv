// Dps with blazing arrow

import BlazingShot from "../abilities/BlazingShot.js";

export default class Magician {
  constructor() {
    this.bulletSettings = {
      velocity: 48 * 10,
      lifeTime: 32 * 16,
    };
    this.dexterity = 0.4; // shots per second
    this.maxHealth = 400;
    this.className = "Magician";
    this.classType = "dps";

    this.abilities = [];
    this.abilities.push(new BlazingShot());
  }

  init(player) {
    this.player = player;
    this.player.velocity = 48 * 6;
    this.player.health = this.maxHealth;
  }

  update(player) {
    if (player.direction.x == 0 && player.direction.y == 0) {
      this.dexterity = 0.4;
    } else {
      this.dexterity -= 0.001;
    }
  }
}

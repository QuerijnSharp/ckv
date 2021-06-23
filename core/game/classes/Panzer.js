import Paralyse from "../abilities/Paralyse.js";
import Stun from "../abilities/Stun.js";

export default class Panzer {
  constructor() {
    this.bulletSettings = {
      velocity: 48 * 8,
      lifeTime: 32 * 16,
    };
    this.dexterity = 0.4; // shots per second
    this.maxHealth = 800;
    this.classType = "tank";
    this.className = "Panzer";

    this.abilities = [];
    this.abilities.push(new Paralyse());
    this.abilities.push(new Stun());
  }

  init(player) {
    this.player = player;
    this.player.velocity = 48 * 3;
    this.player.health = this.maxHealth;
  }

  update(player) {
    if (
      player.direction.x == 0 &&
      player.direction.y == 0 &&
      player.health < this.maxHealth
    ) {
      player.health += 0.1;
    }
  }
}

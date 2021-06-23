import GroupHeal from "../abilities/GroupHeal.js";
import GroupSpeed from "../abilities/GroupSpeed.js";

export default class Underpinner {
  constructor() {
    this.bulletSettings = {
      velocity: 48 * 8,
      lifeTime: 32 * 13,
    };
    this.dexterity = 0.1; // shots per second
    this.maxHealth = 300;
    this.className = "Underpinner";
    this.classType = "support";
    this.abilities = [];
    this.abilities.push(new GroupHeal());
    this.abilities.push(new GroupSpeed());
  }

  init(player) {
    this.player = player;
    this.player.velocity = 48 * 4;
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

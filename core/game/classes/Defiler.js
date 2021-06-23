// Dps or tank / Stealth
import Shield from "../abilities/Shield.js";
import Stealth from "../abilities/Stealth.js";

export default class Defiler {
  constructor() {
    this.bulletSettings = {
      velocity: 48 * 6,
      lifeTime: 32 * 12,
    };
    this.dexterity = 0.75; // shots per second
    this.maxHealth = 800;
    this.classType = "tank";
    this.className = "Defiler";

    this.abilities = [];
    this.abilities.push(new Stealth());
    this.abilities.push(new Shield());
  }

  init(player) {
    this.player = player;
    this.player.velocity = 48 * 3;
    this.player.health = this.maxHealth;
  }

  update(player) {
    if (player.direction.x == 0 && player.direction.y == 0) {
      this.bulletSettings.velocity = 48 * 6;
    } else {
      this.bulletSettings.velocity += 0.1;
    }
  }
}

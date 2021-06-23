// Heal
import GroupHeal from "../abilities/GroupHeal.js";
import Stealth from "../abilities/Stealth.js";
import EntityClass from "./EntityClass.js";
import Bullet from "../Bullet.js";

export default class Curativer extends EntityClass {
  constructor() {
    super();

    this.bulletSettings = {
      velocity: 48 * 6,
      lifeTime: 32 * 16,
    };
    this.dexterity = 0.1; // shots per second
    this.classType = "support";
    this.className = "Curativer";
    this.maxHealth = 400;

    this.abilities = [];
    this.abilities.push(new GroupHeal());
    this.abilities.push(new Stealth());
  }

  init(player) {
    this.player = player;
    this.player.velocity = 48 * 4;
    this.player.health = this.maxHealth;
  }

  update(player) {
    if (player.direction.x == 0 && player.direction.y == 0) {
      this.bulletSettings.lifeTime = 32 * 16;
      this.bulletSettings.velocity = 48 * 6;
    } else {
      this.bulletSettings.lifeTime += 0.01;
      this.bulletSettings.velocity += 0.01;
    }
  }
}

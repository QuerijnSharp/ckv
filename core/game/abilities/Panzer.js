import Paralyse from "../abilities/Paralyse.js";
import Stun from "../abilities/Stun.js";

export default class Panzer {
  constructor(player) {
    this.classType = "tank";
    this.className = "Panzer";
    player.health = 800;

    this.abilities = [];
    this.abilities.push(new Paralyse(player));
    this.abilities.push(new Stun(player));
  }
}

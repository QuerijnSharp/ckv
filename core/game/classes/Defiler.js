// Dps or tank / Stealth
import Shield from "../abilities/Shield.js";
import Stealth from "../abilities/Stealth.js";

export default class Defiler {
  constructor(player) {
    this.classType = "tank";
    this.className = "Defiler";

    player.health = 800;

    this.abilities = [];
    this.abilities.push(new Stealth(player));
    this.abilities.push(new Shield(player));
  }
}

import GroupHeal from "../abilities/Groupheal.js";
import GroupSpeed from "../abilities/Groupspeed.js";

export default class Underpinner {
  constructor(player) {
    this.className = "Underpinner";
    this.classType = "support";
    player.health = 400;
    this.abilities = [];
    this.abilities.push(new GroupHeal(player));
    this.abilities.push(new GroupSpeed(player));
  }
}

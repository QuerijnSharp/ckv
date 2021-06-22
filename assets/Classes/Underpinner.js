import GroupHeal from "../abilities/GroupHeal.js";
import GroupSpeed from "../abilities/GroupSpeed.js";

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

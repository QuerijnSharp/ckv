import Invisible from "../abilities/Invisible.js";
import Teleport from "../abilities/Teleport.js";

export default class Rogue {
  constructor() {
    this.name = "Rogue";
    this.classType = "dps";
    //init with player etc
    this.abilities = [];
    this.abilities.push(new Invisible());
    this.abilities.push(new Teleport());
  }

  init(player) {
    this.player = player;
    this.player.health = 400;
  }
}

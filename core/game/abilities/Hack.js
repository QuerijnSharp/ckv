import Ability from "./Ability.js";

export default class Hack extends Ability {
  constructor(player) {
    super(player, 30000);
  }

  update(time) {
    super.cooldown(time);
  }

  startHack(target) {
    //target hack
  }
}

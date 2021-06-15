import Ability from "./Ability.js";

export default class Teleport extends Ability {
    constructor(player) {
        super(player, 0);
    }

    update(time) {
        super.cooldown(time);
    }

    teleport() {
        //yeah this is gonna get complicated
        this.player.invisible = true;
    }
}
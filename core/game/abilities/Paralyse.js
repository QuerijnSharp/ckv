import Ability from "./Ability.js";

export default class Paralyse extends Ability {
    constructor(player) {
        super(player, 0);
    }

    update(time) {
        super.cooldown(time);
    }



    startParalyse(target) {
        this.player.invisible = true;
    }

    endParalyse(target) {
        this.player.invisible = false;
    }
}
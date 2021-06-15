import Ability from "./Ability.js";

export default class Stun extends Ability {
    constructor(player) {
        super(player, 0);
    }

    update(time) {
        super.cooldown(time);
    }



    startStun(target) {
        this.player.invisible = true;
    }

    endStun(target) {
        this.player.invisible = false;
    }
}
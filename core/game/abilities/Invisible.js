import Ability from "./Ability.js";

export default class Invisible extends Ability {
    constructor(player) {
        super(player, 0);
    }

    update(time) {
        super.cooldown(time);
    }



    startInvisible() {
        this.player.invisible = true;
    }

    endInvisible() {
        this.player.invisible = false;
    }
}
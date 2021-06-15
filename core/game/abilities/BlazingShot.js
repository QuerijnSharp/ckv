import Ability from "./Ability.js";

export default class BlazingShot extends Ability {
    constructor(player) {
        super(player, 5000);
    }

    update(time) {
        super.cooldown(time);
        this.player.dexterity = 100;
    }
}
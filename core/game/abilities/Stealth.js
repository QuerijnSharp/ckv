import Ability from "./Ability.js";

export default class Stealth extends Ability {
    constructor(player) {
        super(player, 5000);
    }

    update(time) {
        super.cooldown(time);
    }



    startParalyse(target) {
        this.player.immortal = true; //Collision with Immortality FIX todo probably should use 'stealth' property instead but whatever
    }

    endParalyse(target) {
        this.player.immortal = false;
    }
}
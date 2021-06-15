import Ability from "./Ability.js";

export default class Shield extends Ability {
    constructor(player) {
        super(player, 5000);
    }

    update(time) {
        super.cooldown(time);
    }


    //TODO complicated stuff
    enableShield(target) {
        //Show shield or something
        this.player.immortal = true; //Collision with Immortality FIX todo probably should use 'stealth' property instead but whatever
    }

    endParalyse(target) {
        this.player.immortal = false;
    }
}
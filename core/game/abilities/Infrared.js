import Ability from "./Ability.js";

export default class Infrared extends Ability {
    constructor(player) {
        super(player, 0);
    }

    update(time) {
        super.cooldown(time);
    }


    //TODO complicated stuff
    enableInfrared(target) {
        //Show shield or something
        this.player.immortal = true; //Collision with Immortality FIX todo probably should use 'stealth' property instead but whatever
    }
}
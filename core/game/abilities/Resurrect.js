import Ability from "./Ability.js";

export default class Resurrect extends Ability {
    constructor(player) {
        super(player, 5000);
    }

    update(time) {
        super.cooldown(time);
    }


    //TODO complicated stuff
    resurrect(target) {
        //Show shield or something
        //TODO resurrect target and stuff complicated stuff
        this.target.health = true; //Collision with Immortality FIX todo probably should use 'stealth' property instead but whatever
    }
}
import Ability from "./Ability.js";

export default class Immortality extends Ability {
    constructor(player) {
        super(player, 30000);
    }

    update(time) {
        super.cooldown(time);
    }

    startImmortality() {
        this.player.team.forEach(p => p.immortal = true) //fix this a bit
    }

    endImmortality() {
        this.player.team.forEach(p => p.immortal = false) //fix this a bit
    }
}
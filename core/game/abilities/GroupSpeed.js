import Ability from "./Ability.js";

export default class GroupSpeed extends Ability {
    constructor(player) {
        super(player, 0);
    }

    update(time) {
        super.cooldown(time);
        this.player.team.forEach(p => p.speed += 5) //fix this a bit
    }
}
import Ability from "./Ability.js";

export default class GroupHeal extends Ability {
    constructor(player) {
        super(player, 0);
    }

    update(time) {
        super.cooldown(time);
        this.player.team.forEach(p => p.heal += 5) //fix this a bit
    }
}
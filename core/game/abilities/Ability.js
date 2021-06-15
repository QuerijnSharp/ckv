export default class Ability {
    constructor(player, cooldown) { //where is the class here ??? TODO
        this.cooldown = cooldown;
        this.player = player;
        //Add what properties are used etc
    }

    update(time) {
        if (this.cooldown > 0)
            this.cooldown -= time; //TODO fix time
    }
}
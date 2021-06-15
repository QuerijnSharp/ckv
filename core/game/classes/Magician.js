// Dps with blazing arrow

import BlazingShot from "../abilities/BlazingShot.js";

export default class Magician {
    constructor(player) {
        this.classType = "dps";
        player.health = 500;

        this.abilities = [];
        this.abilities.push(new BlazingShot(player));
    }
}
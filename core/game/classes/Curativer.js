// Heal
import GroupHeal from "../abilities/Groupheal.js";
import Stealth from "../abilities/Stealth.js";
import EntityClass from "./EntityClass.js";

export default class Curativer extends EntityClass {
    constructor(player) {
        super();
        this.classType = "support";
        this.className = "Curativer";

        player.health = 400;

        this.abilities = [];
        this.abilities.push(new GroupHeal(player));
        this.abilities.push(new Stealth(player));


    }

    async init() {
        await super.init(this.className);
    }
}
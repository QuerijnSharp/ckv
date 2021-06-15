// yeah well here we have our complicated stuff, TODO

import Joystick from "./Joystick.js";
import CircleProgressbar from "./CircleProgressbar.js";

export default class GUI {
    constructor(mode) {
        this.mode = mode;
        if (this.mode.name == "KOTH") {
            this.team1Progressbar = new CircleProgressbar("#46EBFF");
            this.team2Progressbar = new CircleProgressbar("#E02962");
        }

        this.joystick = new Joystick(0, 0, 1); //TODO. yeah wtf is this complicated stuff
    }

    update(time, game) {

    }

    draw(ctx, game) {
        //draw healthbar, if mobile controls and send them into the game on update aswell as handle keyboard

        //draw progressbars
        if (this.mode.name == "KOTH") {
            //draw progress bars for each team
            let barWidth = 0.07 * ctx.canvas.width;
            let barHeight = barWidth; //yeah same thing :)

            let team1X = 0.4 * ctx.canvas.width;
            let team1Y = 0.05 * ctx.canvas.height;
            this.team1Progressbar.draw(ctx, team1X, team1Y, barWidth, barHeight, game.team1Percentage);

            let team2X = 0.6 * ctx.canvas.width;
            let team2Y = 0.05 * ctx.canvas.height;
            this.team2Progressbar.draw(ctx, team2X, team2Y, barWidth, barHeight, game.team2Percentage);
        }
    }

    drawControls(ctx, game) {
        if (!game.mobile)
            return;

        //draw class buttons
    }
}
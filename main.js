import Game from "./core/game/Game.js";
import Rogue from "./core/game/classes/Rogue.js";
import Curativer from "./core/game/classes/Curativer.js";
import Defiler from "./core/game/classes/Defiler.js";
import Magician from "./core/game/classes/Magician.js";
import Panzer from "./core/game/classes/Panzer.js";
import Underpinner from "./core/game/classes/Underpinner.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;

let classes = [
  new Rogue(),
  new Curativer(),
  new Defiler(),
  new Magician(),
  new Panzer(),
  new Underpinner(),
];

var game = new Game(
  canvas,
  ctx,
  classes[Math.floor(Math.random() * classes.length)]
);
window.game = game;

if (document.readyState !== "loading") {
  (async function () {
    document.body.scrollTop = 0;
    await game.init("snowfall");
  })();
} else {
  document.addEventListener("DOMContentLoaded", async () => {
    document.body.scrollTop = 0;
    await game.init("snowfall");
  });
}

window.addEventListener(
  "resize",
  () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    window.game.moveController.posX = 100;
    window.game.moveController.posY = canvas.height - 100;
    window.game.moveController.x = 100;
    window.game.moveController.y = canvas.height - 100;

    window.game.fsButton.posX = canvas.width - 100;
    window.game.fsButton.posY = 100;
    //requestFullscreen
  },
  {
    passive: true,
  }
);

/*
window.requestAnimationFrame = (function () {
	return  window.requestAnimationFrame ||
			window.webkitRequestAnimationFrame ||
			window.mozRequestAnimationFrame ||
			window.oRequestAnimationFrame ||
			window.msRequestAnimationFrame ||
			function (callback, el) {
				window.setTimeout(function() {
					callback(+new Date);
				}, 1000 / 60);
			};
})();

window.cancelRequestAnimationFrame = (function () {
    return window.cancelRequestAnimationFrame
		|| window.webkitCancelAnimationFrame
		|| window.webkitCancelRequestAnimationFrame
		|| window.mozCancelRequestAnimationFrame
		|| window.oCancelRequestAnimationFrame
		|| window.msCancelRequestAnimationFrame
		|| clearTimeout
})();
*/

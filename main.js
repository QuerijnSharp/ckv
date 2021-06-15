import Game from "./core/game/Game.js";
import Rogue from "./core/game/classes/Rogue.js";

let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
canvas.width = document.documentElement.clientWidth;
canvas.height = document.documentElement.clientHeight;
var game = new Game(canvas, ctx, new Rogue());
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
3;

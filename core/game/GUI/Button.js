import Emitter from "../../utils/Emitter.js";
import Joystick from "./Joystick.js";

export default class Button extends Emitter {
  constructor(posX, posY, radius) {
    super();
    this.posX = posX;
    this.posY = posY;
    this.radius = radius;
  }
  /**
   * Returns a Vector2 class for the current position, where x and y are a number between -100 and 100
   */
  getVector2() {
    return new Vector2(
      -(this.posX - this.x) / (this.radius / 2),
      -(this.posY - this.y) / (this.radius / 2)
    );
  }

  init(canvas) {
    if (this.hasTouch()) {
      // maybe use window instead of document.documentElement.. TODO
      var _this = this;
      var _eventHandler = (event) => {
        // Prevent the browser from doing its default thing (scroll, zoom)
        event.preventDefault();
        for (let touch of event.changedTouches) {
          let rect = event.target.getBoundingClientRect();
          let x = touch.clientX - rect.left; //x position within the element.
          let y = touch.clientY - rect.top; //y position within the element.
          if (
            x >= _this.posX &&
            x <= _this.posX + _this.radius &&
            y >= _this.posY &&
            y <= _this.posY + _this.radius
          ) {
            let cvs = document.getElementById("canvas");
            let rfs =
              cvs.requestFullscreen ||
              cvs.webkitRequestFullScreen ||
              cvs.mozRequestFullScreen ||
              cvs.msRequestFullscreen;
            rfs.call(cvs);
            let customEvent = new CustomEvent("click");
            _this.dispatchEvent(customEvent);
          }
        }
        if (!touching) {
        }
      };
      canvas.addEventListener("touchend", _eventHandler, false);
    } else {
      var _this = this;
      var _eventHandler = (event) => {
        // Prevent the browser from doing its default thing (scroll, zoom)
        event.preventDefault();

        let rect = event.target.getBoundingClientRect();
        let x = event.clientX - rect.left; //x position within the element.
        let y = event.clientY - rect.top; //y position within the element.
        if (
          x >= _this.posX &&
          x <= _this.posX + _this.radius &&
          y >= _this.posY &&
          y <= _this.posY + _this.radius
        ) {
          let cvs = document.getElementById("canvas");
          let rfs =
            cvs.requestFullscreen ||
            cvs.webkitRequestFullScreen ||
            cvs.mozRequestFullScreen ||
            cvs.msRequestFullscreen;
          rfs.call(cvs);
          let customEvent = new CustomEvent("click");
          _this.dispatchEvent(customEvent);
        }
      };
      canvas.addEventListener("mouseup", _eventHandler, false);
    }
  }

  roundRect(ctx, x, y, width, height, radius, fill, stroke) {
    if (typeof stroke === "undefined") {
      stroke = true;
    }
    if (typeof radius === "undefined") {
      radius = 5;
    }
    if (typeof radius === "number") {
      radius = { tl: radius, tr: radius, br: radius, bl: radius };
    } else {
      var defaultRadius = { tl: 0, tr: 0, br: 0, bl: 0 };
      for (var side in defaultRadius) {
        radius[side] = radius[side] || defaultRadius[side];
      }
    }
    ctx.beginPath();
    ctx.moveTo(x + radius.tl, y);
    ctx.lineTo(x + width - radius.tr, y);
    ctx.quadraticCurveTo(x + width, y, x + width, y + radius.tr);
    ctx.lineTo(x + width, y + height - radius.br);
    ctx.quadraticCurveTo(
      x + width,
      y + height,
      x + width - radius.br,
      y + height
    );
    ctx.lineTo(x + radius.bl, y + height);
    ctx.quadraticCurveTo(x, y + height, x, y + height - radius.bl);
    ctx.lineTo(x, y + radius.tl);
    ctx.quadraticCurveTo(x, y, x + radius.tl, y);
    ctx.closePath();
    if (fill) {
      ctx.fill();
    }
    if (stroke) {
      ctx.stroke();
    }
  }

  draw(ctx) {
    ctx.save();
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#808080";
    ctx.fillStyle = "#abc";
    this.roundRect(
      ctx,
      this.posX,
      this.posY,
      this.radius,
      this.radius,
      3,
      true,
      true
    );

    ctx.font = "25px Arial";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillStyle = "#808080";
    ctx.fillText(
      "FS",
      this.posX + this.radius / 2,
      this.posY + this.radius / 2
    );
    ctx.restore();
  }

  hasTouch() {
    return (
      "ontouchstart" in document.documentElement && "ontouchstart" in window
    ); //use window instead?? TODO
  }
}

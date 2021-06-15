import Vector2 from "../../math/Vector2.js";

export default class Keyboard {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.map = {};
    this.const = 0.5 * Math.sqrt(2);
  }

  getVector2() {
    if (this.map["Down"] && this.map["Right"]) {
      this.x = this.const;
      this.y = this.const;
    } else if (this.map["Down"] && this.map["Left"]) {
      this.x = -this.const;
      this.y = this.const;
    } else if (this.map["Up"] && this.map["Right"]) {
      this.x = this.const;
      this.y = -this.const;
    } else if (this.map["Up"] && this.map["Left"]) {
      this.x = -this.const;
      this.y = -this.const;
    } else if (this.map["Up"]) {
      this.y = -1;
      this.x = 0;
    } else if (this.map["Down"]) {
      this.y = 1;
      this.x = 0;
    } else if (this.map["Left"]) {
      this.x = -1;
      this.y = 0;
    } else if (this.map["Right"]) {
      this.x = 1;
      this.y = 0;
    } else {
      this.x = 0;
      this.y = 0;
    }

    return new Vector2(this.x, this.y);
  }

  init(canvas) {
    let _this = this;
    let _eventHandlerDown = (event) => {
      // Prevent the browser from doing its default thing (scroll, zoom)
      switch (event.key) {
        case "ArrowDown":
        case "S":
        case "s":
          _this.map["Down"] = true;
          break;
        case "ArrowUp":
        case "W":
        case "w":
          _this.map["Up"] = true;
          break;
        case "ArrowLeft":
        case "A":
        case "a":
          _this.map["Left"] = true;
          break;
        case "ArrowRight":
        case "D":
        case "d":
          _this.map["Right"] = true;
          break;
      }
    };

    let _eventHandlerUp = (event) => {
      // Prevent the browser from doing its default thing (scroll, zoom)
      switch (event.key) {
        case "ArrowDown":
        case "S":
        case "s":
          _this.map["Down"] = false;
          break;
        case "ArrowUp":
        case "W":
        case "w":
          _this.map["Up"] = false;
          break;
        case "ArrowLeft":
        case "A":
        case "a":
          _this.map["Left"] = false;
          break;
        case "ArrowRight":
        case "D":
        case "d":
          _this.map["Right"] = false;
          break;
      }
      event.preventDefault();
    };

    window.addEventListener("keydown", _eventHandlerDown, false);
    window.addEventListener("keyup", _eventHandlerUp, false);
  }

  draw(ctx) {}
}

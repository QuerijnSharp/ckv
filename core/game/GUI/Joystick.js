//TODO fix this

import Vector2 from "../../math/Vector2.js";
import math from "../math/math.js";

export default class Joystick {
    constructor(posX, posY, radius) {
        this.posX = posX;
        this.posY = posY;
        this.x = posX;
        this.y = posY;
        this.radius = radius;
    }

    update(position, radius) {
        this.posX = position.x;
        this.posY = position.y;

        this.x = posX;
        this.y = posY;

        this.radius = radius;
    }

    /**
     * Returns a Vector2 class for the current position, where x and y are a number between -100 and 100
     */
    getVector2() {
        return new Vector2(-(this.posX - this.x) / (this.radius / 2), -(this.posY - this.y) / (this.radius / 2));
    }

    init(canvas) {
        if (Joystick.hasTouch()) { // maybe use window instead of document.documentElement.. TODO
            var _this = this;
            var _eventHandler = (event) => {
                // Prevent the browser from doing its default thing (scroll, zoom)
                event.preventDefault();
                let touching = false;
                if (event.type == "touchend") {
                    _this.x = _this.posX;
                    _this.y = _this.posY;
                    return;
                }
                for (let touch of event.changedTouches) {
                    var rect = event.target.getBoundingClientRect();
                    var x = touch.clientX - rect.left; //x position within the element.
                    var y = touch.clientY - rect.top; //y position within the element.
                    let distance = math.distance(_this.posX, x, _this.posY, y); //use isPointInPath instead??
                    if (distance <= _this.radius * 5) {
                        touching = true;
                        if (distance <= _this.radius / 2) {
                            _this.x = touch.pageX;
                            _this.y = touch.pageY;
                        } else {
                            let vec2 = new Vector2(touch.pageX, touch.pageY);
                            let center = new Vector2(_this.posX, _this.posY);
                            let resultVector = Vector2.projectOntoCircle(center, vec2, _this.radius / 2);
                            _this.x = resultVector.x;
                            _this.y = resultVector.y;
                        }
                        break;
                    }
                }
                if (!touching) {
                    _this.x = _this.posX;
                    _this.y = _this.posY;
                }
            }
            canvas.addEventListener("touchstart", _eventHandler, false);
            canvas.addEventListener("touchmove", _eventHandler, false);
            canvas.addEventListener("touchend", _eventHandler, false);
        }
    }

    /**
     * 
     * @param {TouchEvent} event 
     */
    onTouch(event) {
        // Prevent the browser from doing its default thing (scroll, zoom)
        event.preventDefault();
        let touching = false;
        for (let touch of event.changedTouches) {
            var rect = event.target.getBoundingClientRect();
            var x = event.clientX - rect.left; //x position within the element.
            var y = event.clientY - rect.top; //y position within the element.
            let distance = math.distance(this.posX, x, y, touch.pageY); //use isPointInPath instead??
            if (distance <= this.radius) {
                touching = true;
                if (distance <= this.radius / 2) {
                    this.x = touch.pageX;
                    this.y = touch.pageY;
                } else {
                    let vec2 = new Vector2(touch.pageX, touch.pageY);
                    let center = new Vector2(this.posX, this.posY);
                    let resultVector = Vector2.projectOntoCircle(center, vec2, this.radius / 2);
                    this.x = resultVector.x;
                    this.y = resultVector.y;
                }
                break;
            }
        }
    }

    fillCircle(ctx, posX, posY, radius) {
        ctx.beginPath();
        ctx.arc(posX, posY, radius, 0, Math.PI * 2);
        ctx.fill();
    }

    drawCircle(ctx, posX, posY, radius) {
        ctx.beginPath();
        ctx.arc(posX, posY, radius, 0, Math.PI * 2);
        ctx.stroke();
    }

    draw(ctx) {
        ctx.save();
        //Outer circle
        ctx.fillStyle = "#d3d3d3";
        ctx.globalAlpha = 0.5;
        this.fillCircle(ctx, this.posX, this.posY, this.radius);
        ctx.lineWidth = 3;
        this.drawCircle(ctx, this.posX, this.posY, this.radius);
        //Inner circle
        ctx.fillStyle = "#FFFFFF";
        ctx.globalAlpha = 0.6;
        this.fillCircle(ctx, this.x, this.y, this.radius / 2);
        ctx.lineWidth = 1;
        this.drawCircle(ctx, this.x, this.y, this.radius / 2);
        ctx.restore();
    }
}
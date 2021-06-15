import Vector2 from "../math/Vector2.js";

export default class Bullet {
    /**
     * 
     * @param {*} buffer 
     * @param {*} x 
     * @param {*} y 
     * @param {Vector2} velocity 
     */
    constructor(buffer, x, y, velocity) {
        this.buffer = buffer;
        this.position = new Vector2(x, y);
        this.direction = new Vector2(x, y); //normalize this vector / angle??
        this.velocity = velocity;
    }

    update(time) {
        this.position.add(this.direction.multiply2(this.velocity * time));
    }

    draw(ctx, game) {
        ctx.drawImage(this.buffer, 0, 0, this.buffer.width, this.buffer.height, this.position.x, this.position.y, this.buffer.width, this.buffer.height);
    }
}
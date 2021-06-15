export default class Vector2 {
  constructor(x, y) {
    this.x = 0;
    this.y = 0;
    this.x = x;
    this.y = y;
  }

  add(v) {
    this.x += v.x;
    this.y += v.y;
  }

  add2(v) {
    return new Vector2(this.x + v.x, this.y + v.y);
  }

  copy() {
    return new Vector2(this.x, this.y);
  }

  distance(v) {
    return Math.hypot(v.x - this.x, v.y - this.y);
  }

  multiply(scalar) {
    this.x *= scalar;
    this.y *= scalar;
  }

  multiply2(scalar) {
    return new Vector2(this.x * scalar, this.y * scalar);
  }

  divide(scalar) {
    this.x /= scalar;
    this.y /= scalar;
  }

  divide2(scalar) {
    return new Vector2(this.x / scalar, this.y / scalar);
  }

  normalize() {
    let norm = Math.hypot(this.x, this.y);
    this.x /= norm;
    this.y /= norm;
  }

  subtract(v) {
    this.x -= v.x;
    this.y -= v.y;
  }

  subtract2(v) {
    return new Vector2(this.x - v.x, this.y - v.y);
  }

  //TODO forgot how this worked*
  static projectOntoCircle(center, target, radius) {
    let distance = center.distance(target);
    let subtract = target.subtract2(center);
    let division = subtract.divide2(distance);
    let multiplication = division.multiply2(radius);
    return center.add2(multiplication);
  }
}

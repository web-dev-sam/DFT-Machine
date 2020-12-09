class Complex {

  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  add(comp) {
    this.x += comp.x;
    this.y += comp.y;
    return new Complex(this.x, this.y);
  }

  scale(scale) {
    this.x *= scale;
    this.y *= scale;
    return new Complex(this.x, this.y);
  }

  cexp() {
    return new Complex(exp(this.x) * cos(this.y), exp(this.x) * sin(this.y));
  }

  mul(b) {
    const cache = this.x * b.x - this.y * b.y;
    this.y = this.x * b.y + this.y * b.x;
    this.x = cache;
    return new Complex(this.x, this.y);
  }

  abs() {
    return dist(0, 0, this.x, this.y);
  }

  print() {
    print(this.x + " + " + this.y + "i");
  }
  
  render() {
    stroke(255);
    strokeWeight(3);
    point(this.x * SCALE, this.y * SCALE);
  }
}

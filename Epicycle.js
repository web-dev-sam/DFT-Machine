

/*
* A circle with a planet that has a position and a constant velocity
*/
class Epicycle  {

  constructor(position, initialDirectionVector, radialVelocity) {
    this.position = position;
    this.radialVelocity = radialVelocity;
    this.size = initialDirectionVector.abs();
    this.angle = atan2(initialDirectionVector.y, initialDirectionVector.x);
  }

  getPlanetPosition() {
    return new Complex(
      this.position.x + this.size * cos(this.angle),
      this.position.y + this.size * sin(this.angle)
    );
  }

  update() {
    this.angle += this.radialVelocity * VELO;
  }

  draw(position) {
    this.position = position;
    
    // Draw vector
    stroke(200);
    strokeWeight(1);
    line(this.position.x * SCALE,
      this.position.y * SCALE,
      (this.position.x + this.size * cos(this.angle)) * SCALE,
      (this.position.y + this.size * sin(this.angle)) * SCALE
    );
    
    // Draw circle
    stroke(80);
    noFill();
    const ax = this.position.x * SCALE;
    const ay = this.position.y * SCALE;
    circle(ax, ay, this.size * 2 * SCALE);
  }
}

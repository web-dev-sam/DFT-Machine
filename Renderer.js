class Renderer {
  
  constructor(dftFunction, vertices) {
    this.dftFunction = dftFunction;
    this.vertices = vertices;
    this.path = [];
  }
  
  
  /*
  * Builds all epicycle data based on the dft results
  */
  buildEpicycles() {
    this.epicycles = [];
    const position = new Complex(0, 0);
  
    for (let i=0; i<this.vertices.length; i++) {
      const initialDirectionVector = this.dftFunction[i];  // y-Axis (offset/position)
      const radialVelocity = i - floor(this.vertices.length / 2); // x-Axis (frequency/velocity)
      const epicycle = new Epicycle(position, initialDirectionVector, radialVelocity);
      
      this.epicycles.push(epicycle);
      position.add(initialDirectionVector);
    }
    
    this.epicycles = this.epicycles.sort((a, b) => b.size - a.size);
  }
  
  
  /*
  * Renders all epicycles
  */
  render() {
    
    // Draw epicycles
    let currentCoords = new Complex(0, 0);
    for (const epicycle of this.epicycles) {
      epicycle.update();
      epicycle.draw(currentCoords);
      currentCoords = epicycle.getPlanetPosition();
    }
    
    // Draw vertex history (result line of epicycle drawing)
    const lastPlanet = this.epicycles[this.epicycles.length-1];
    let previousPathPoint = this.path[0];
    this.path.push(lastPlanet.getPlanetPosition());
    if (this.path.length > 1) {
      let i=128;
      for (const vertex of this.path) {
        colorMode(HSB, 255);
        stroke(i%255, 255, 255);
        strokeWeight(2);
        if (customMode || dist(vertex.x, vertex.y, previousPathPoint.x, previousPathPoint.y) < 0.8)
          line(vertex.x * SCALE, vertex.y * SCALE, previousPathPoint.x * SCALE, previousPathPoint.y * SCALE);
        previousPathPoint = vertex;
        i+=0.2;
      }
    }
    
    // Draw vertices (user inputs)
    if (drawData) {
      colorMode(RGB, 255);
      for (const vertex of this.vertices) {
        stroke(255);
        strokeWeight(4);
        point(vertex.x * SCALE, vertex.y * SCALE);
      }
    }
  }
}

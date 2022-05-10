// Abstract
class Enemy extends GameObject {
  constructor(x, y, image) {
    super(x, y, 140, 115);
    this.image = image;
    this.speed = 0;
    this.acceleration = 0.7;
    this.fall = true;
  }
  update() {
    if(this.fall) {
      this.transform.position.y += this.speed;
      this.speed += this.acceleration;
    } else { this.speed = 0; }
    this.fall = layers[0].context.getImageData(this.transform.position.x, this.transform.position.y + this.transform.size.y / 2, 1, 1).data[3] === 0;
    if(layers[0].context.getImageData(this.transform.position.x, this.transform.position.y - this.transform.size.y / 2, 1, 1).data[3] != 0) {
      clearCircle(0, this.transform, 175);
      this.destroyed = true;
    }    
    renderImage(this.image, 1, this.transform);
  }
  collision(other) {
    if(other instanceof FlyCreature || other instanceof Enemy) {
      this.transform.position.y = other.transform.position.y - (other.transform.size.y + this.transform.size.y) / 2 - other.speed + 1;
      this.fall = false;
    }
  }
}
// Abstract
class Creature extends Button {
  constructor(x, y, image, creature) {
    super(x, y, 140, 115);
    this.image = image;
    this.creature = creature;
  }
  update() {
    this.transform.position.y += (700 - this.transform.position.y) * (this.transform.position.y < 700);
    renderImage(this.image, 1, this.transform);
    super.update();
  }
  onPress() { this.transform.position = mouse.transform.position; }
  onRelease() {
    objects.push(new this.creature(this.transform.position.x, this.transform.position.y, this.image));
    this.destroyed = true;
  }
}

class FlyCreature extends GameObject {
  constructor(x, y, image) { super(x, y, 140, 115); this.image = image; }
  update() { renderImage(this.image, 1, this.transform); }
  collision() {}
}
// Abstract

// Specific
class First extends FlyCreature {
  constructor(x, y, image) { super(x, y, image); this.speed = 0; this.acceleration = 0.7; }
  update() {
    this.transform.position.y -= this.speed;
    this.speed += this.acceleration;
    super.update();
    if(layers[0].context.getImageData(this.transform.position.x, this.transform.position.y - this.transform.size.y / 2, 1, 1).data[3] != 0) {
      clearCircle(0, this.transform, 175);
      this.destroyed = true;
    }
  }
}
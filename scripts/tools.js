// Maths
function abs(value) { return value >= 0 ? value : -value; }

function sqr(value) { return value * value; }

let seed = 0; function random() { return ((seed = (71 * seed + 1) % 100000) / 100000); }

function float2int (value) { return value | 0; }
// Maths


// Render
const layers = [];
class Layer {
  constructor() {
    this.canvas = document.createElement("canvas");
    this.context = this.canvas.getContext("2d");

    document.querySelector("body").appendChild(this.canvas);
    this.canvas.width = canvas.width;
    this.canvas.height = canvas.height;
  }
}

function renderImage(image, layer, transform) {
  layers[layer].context.drawImage(image,
    transform.position.x - transform.size.x / 2,
    transform.position.y - transform.size.y / 2,
    transform.size.x,
    transform.size.y);
}

function clearTransform(layer, transform) {
  layers[layer].context.clearRect(
    transform.position.x - transform.size.x / 2,
    transform.position.y - transform.size.y / 2,
    transform.size.x,
    transform.size.y);
}

function clearCircle(layer, transform, radius) {
  layers[layer].context.save();
  layers[layer].context.beginPath();
  layers[layer].context.arc(transform.position.x, transform.position.y, radius, 0, 2 * Math.PI, true);
  layers[layer].context.clip();
  layers[layer].context.clearRect(transform.position.x - radius,transform.position.y - radius,radius * 2,radius * 2);
  layers[layer].context.restore();
}
// Render


// Input
class Mouse extends GameObject {
  constructor() { super(0, 0, 0, 0); this.down = false; }

  move(x, y) {
    this.transform.position.x = (x - canvas.offsetLeft) / (canvas.offsetWidth / canvas.width);
    this.transform.position.y = (y - canvas.offsetTop) / (canvas.offsetHeight / canvas.height);
  }

  touch(event) { if (event.touches.length > 0) this.move(event.touches[0].clientX, event.touches[0].clientY); }

  collision(other) {}
}
const mouse = new Mouse(); objects.push(mouse);

// PC input
document.addEventListener("mousemove", (event) => mouse.move(event.clientX, event.clientY));
document.addEventListener("mousedown", () => mouse.down = true);
document.addEventListener("mouseup", () => mouse.down = false);
// PC input

// Mobile input
document.addEventListener("touchmove", (event) => mouse.touch(event));
document.addEventListener("touchstart", function(event) { mouse.down = true; mouse.touch(event); });
document.addEventListener("touchend", () => mouse.down = false);
// Mobile input
// Input


// UI
class Button extends GameObject {
  constructor(x, y, width, height) {
    super(x, y, width, height);
    this.isStartPoint = false;
    this.pressed = false;
    this.collide = false;
  }

  update() {
    if(this.pressed) {
      if(this.onInterrupt != null & !this.collide) this.onInterrupt();
      if(this.onRelease != null & !mouse.down) this.onRelease();
    }

    this.isStartPoint = mouse.down ? this.isStartPoint : true;
    this.isStartPoint = !this.collide ? false : this.isStartPoint;

    this.pressed = this.pressed ? mouse.down & this.collide : false;
    this.collide = false;
  }

  collision(other) {
    if(other.constructor.name === "Mouse") {
      if(mouse.down & !this.pressed & this.isStartPoint) { this.pressed = true; if (this.onPress) this.onPress(); }
      this.collide = true;
    }
  }
}
// UI

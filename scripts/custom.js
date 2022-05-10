layers.push(new Layer()); layers.push(new Layer());

images = [];
for(let i = 0; i < 2; i += 1)
  images.push(new Image());

images[0].src = "resources/images/creature.png";
images[1].src = "resources/images/enemy.png";

function createGround(context) {
  context.beginPath();
  context.moveTo(0, 0);
  context.lineTo(0, 270);

  context.lineTo(100, 400);
  context.lineTo(200, 500);
  context.lineTo(300, 520);
  context.lineTo(400, 500);
  context.lineTo(500, 400);
  context.lineTo(600, 200);
  context.lineTo(700, 150);
  context.lineTo(800, 135)
  context.lineTo(900, 150);
  context.lineTo(1000, 200);

  context.lineTo(1080, 270);
  context.lineTo(1080, 0);

  context.strokeStyle = "blue";
  context.lineWidth = 70;
  context.stroke();

  context.fillStyle = 'aquamarine';
  context.fill();

  clearCircle(0, new Transform(300, 260, 0, 0), 75);
  clearCircle(0, new Transform(450, 160, 0, 0), 75);
  clearCircle(0, new Transform(600, 60, 0, 0), 75);
  clearCircle(0, new Transform(1000, 100, 0, 0), 75);

}
createGround(layers[0].context);

class Clear extends GameObject {
  constructor(){ super(540, 540, 1080, 1080) };
  update() { clearTransform(1, this.transform); }
}



objects.push(new Clear());
for(let i = 0; i < 5; i += 1) {
  objects.push(new Creature(((1080-300)/4) * i + 150, 880, images[0], First));
}
objects.push(new Enemy(300, 260, images[1]));
objects.push(new Enemy(450, 160, images[1]));
objects.push(new Enemy(600, 60, images[1]));
objects.push(new Enemy(1000, 100, images[1]));


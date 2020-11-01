var input = new Inp();

window.onmousemove = function() {
  input.mousePos = new Vector2(event.clientX, event.clientY);
}
ctx.canvas.onmousedown = function() {
  if (mclkp == undefined) {
    mclkp = input.mousePos
  } else {
    lines.push(new Line(input.mousePos.x, input.mousePos.y, mclkp.x, mclkp.y))
    mclkp = input.mousePos
  }
}
window.onkeydown = function() {
  input.keyPressed = event.key
}
window.onkeyup = function() {
  input.keyPressed = ""
}

mclkp = undefined

//var ray = new Ray(150, 150);
var line1 = new Line(300, 50, 300 , 250);

lines = [line1,
new Line(300, 250, 500, 250),
new Line(500, 250, 500, 50),
new Line(500, 50, 300, 50),
new Line(0, 0, 0, ctx.canvas.height),
new Line(0, ctx.canvas.height, ctx.canvas.width, ctx.canvas.height),
new Line(ctx.canvas.width, ctx.canvas.height, ctx.canvas.width, 0),
new Line(ctx.canvas.width, 0, 0, 0),
]

setInterval(function loop() {
  ctx.fillStyle = "#000000"
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = "#FFFFFF"
  ctx.strokeStyle = "#FFFFFF"

  q = 360 / document.getElementById('rayCountInput').value;

  for (i = 0; i < 360; i+=q) {
    record = Infinity
    closest = undefined
    ang = new Vector2(Math.cos(i * (Math.PI/180)), -Math.sin(i * (Math.PI/180)))
    ray = new Ray(input.mousePos.x, input.mousePos.y, ang.x, ang.y)
    for (let line of lines) {
      p = ray.cast(line)
      if (p == undefined) {continue}
      if (record > length(ray.pos, p)) {
        record = length(ray.pos, p)
        closest = p
      }
      //line.draw()
    }
    if (closest != undefined) {Dine(ray.pos.x, ray.pos.y, closest.x, closest.y)}
  }
}, 10)
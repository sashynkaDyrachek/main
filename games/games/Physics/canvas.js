var input = new Inp();

window.onmousemove = function() {
  input.mousePos = new Vector2(event.clientX, event.clientY);
}
window.onmousedown = function() {
  layers[0].push(new Ellipse(input.mousePos.x, input.mousePos.y, 20, 1))
}
window.onkeydown = function() {
  input.keyPressed = event.key
}
window.onkeyup = function() {
  input.keyPressed = ""
}

var ellipse = new Ellipse(150, 150, 2, 1);
var PlayerEllipse = new Ellipse(150, 150, 40);
var square = new Square(150, 150, 20)
var rectangle = new Rectangle(150, 150, 500, 40)

layers[0] = [ellipse, PlayerEllipse]

setInterval(function loop() {
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = "#000000"
  ctx.strokeStyle = "#000000"

  ellipse.pos = input.mousePos

  for (i=1;i<layers[0].length;i++) {
    layers[0][i].physics.update()
    //layers[0][i].physics.joint(PlayerEllipse)
    layers[0][i].draw()
  }

  PlayerEllipse.draw()
  ellipse.draw()
}, 10)
var input = new Inp();

window.onmousemove = function() {
  input.mousePos = new Vector2(event.clientX, event.clientY);
}
window.onmousedown = function() {
  layers[0].push(new Ellipse(input.mousePos.x, input.mousePos.y, 20, 1))
}
window.onkeydown = function() {
  input.keyPressed = event.key
  if (input.keyPressed == "w" || input.keyPressed == "W") {
    input.axis.y = 1
  } else if (input.keyPressed == "a" || input.keyPressed == "A") {
    input.axis.x = -1
  } else if (input.keyPressed == "s" || input.keyPressed == "S") {
    input.axis.y = -1
  } else if (input.keyPressed == "d" || input.keyPressed == "D") {
    input.axis.x = 1
  } else {
    input.axis = new Vector2(0, 0)
  }
}
window.onkeyup = function() {
  input.keyPressed = ""
}

var ellipse = new Ellipse(150, 150, 2, 1);
var PlayerEllipse = new Ellipse(150, 150, 40);
var PlayerSquare = new Square(150, 150, 20)
var rectangle = new Rectangle(150, 150, 500, 40)

layers[0] = [ellipse, PlayerSquare]//, PlayerEllipse]

world = [0, 100]

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

  ctx.beginPath()
  for (i = 0; i < Math.floor(ctx.canvas.width/20); i++) {
    ctx.lineTo(Math.floor(ctx.canvas.width/20) * i, Lerp(0, 0, i, (ctx.canvas.height/2), i) + (ctx.canvas.height/2))
  }
  ctx.stroke()

  var ax = input.axis.copy()

  PlayerSquare.physics.addVelocity(ax.setLength(0.1))

  PlayerEllipse.draw()
  ellipse.draw()
}, 10)
var input = new Inp();

window.onmousemove = function() {
  input.mousePos = new Vector2(event.clientX, event.clientY);
}
ctx.canvas.onmousedown = function() {
}
window.onkeydown = function() {
  input.keyPressed = event.key
}
window.onkeyup = function() {
  input.keyPressed = ""
}

var ray = new Ray(250, 250)
var zray = new Ray(250, 250)

setInterval(function loop() {
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.strokeStyle = "#000000"

  ray.lookAt(input.mousePos)
  zray.vect = new Vector2(1, 1)

  zray.norm(1)

  console.log((ray.vect.x * zray.vect.x + ray.vect.y * zray.vect.y)/(length(ray.vect) * length(zray.vect)) * 100)

  Dine(ray.pos.x, ray.pos.y, ray.pos.x + ray.vect.x * 10, ray.pos.y + ray.vect.y * 10)

  ray.draw()
  zray.draw()
}, 20)
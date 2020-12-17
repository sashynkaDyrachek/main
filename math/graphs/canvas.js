width = ctx.canvas.width
height = ctx.canvas.height

function limOut (text) {
  document.getElementById("lim").innerHTML = "lim of function = " + text
}

var limInput = document.getElementById("lim input")

var pry = 0

var limP = 0

function f(x) {
  return Math.sin(x)
}

setInterval(function loop() {
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.fillStyle = "#000000"
  ctx.strokeStyle = "#000000"

  limP = limInput.value

  ctx.beginPath()

  ctx.strokeStyle = "#00000088"

  for (var x = 0; x < Math.floor(width / 20); x++) {
    ctx.moveTo(x * 20, 0)
    ctx.lineTo(x * 20, height)
  }

  for (var y = 0; y < Math.floor(height / 20); y++) {
    ctx.moveTo(0, y * 20)
    ctx.lineTo(width, y * 20)
  }

  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = "#00FF00"
  ctx.moveTo(width/2, 0)
  ctx.lineTo(width/2, height)
  ctx.stroke()

  ctx.beginPath()
  ctx.strokeStyle = "#0000FF"
  ctx.moveTo(0, height/2)
  ctx.lineTo(width, height/2)
  ctx.stroke()

  ctx.beginPath()

  ctx.strokeStyle = "#000000"

  pry = 0

  for (var x = -width/2; x < Math.floor(width / 20); x++) {
    if (x > limP) {break}
    y = f(x)
    pry = y
    y = height/2 - y*20
    ctx.lineTo(width/2 + x * 20, y)
  }
  limOut(f(limP))

  ctx.stroke()
}, 10)
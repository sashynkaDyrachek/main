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


sceen = []

startv = 8339776474



width = ctx.canvas.width
height = ctx.canvas.height


setInterval(function loop() {
  ctx.fillStyle = "#FFFFFF"
  ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
  ctx.strokeStyle = "#000000"

numOfOktav = +document.getElementById("InputOktav").value
zoom = document.getElementById("Input").value

pw = ctx.canvas.width / zoom
ph = ctx.canvas.height / zoom

  v = startv

  sceen = []

  for (x = 0; x <= zoom; x++) {
    sceen[x] = []
    for (y = 0; y <= zoom; y++) {
      v = Srandom(v)
      r = Interval(v, 0, 99)
      v = Srandom(v)
      g = Interval(v, 0, 99)
      v = Srandom(v)
      b = Interval(v, 0, 99)
      sceen[x][y] = new Pixel(x * pw, y * ph, pw, ph, r, g, b)
    }
  }

  for (x = 0; x < sceen.length; x++) {
    for (y = 0; y < sceen[x].length; y++) {
      if (x % numOfOktav != 0 || y % numOfOktav) {
        x1 = x - (x % numOfOktav)
        y1 = y - (y % numOfOktav)
        x2 = x + (numOfOktav - (x % numOfOktav))
        y2 = y + (numOfOktav - (y % numOfOktav))
        if (sceen[x2] != undefined && sceen[x2][y2] != undefined) {
          r = Beline_Interpole(x1, y1, x2, y2, sceen[x1][y1].color.r, sceen[x2][y1].color.r, sceen[x2][y2].color.r, sceen[x1][y2].color.r, x, y)
          g = Beline_Interpole(x1, y1, x2, y2, sceen[x1][y1].color.g, sceen[x2][y1].color.g, sceen[x2][y2].color.g, sceen[x1][y2].color.g, x, y)
          b = Beline_Interpole(x1, y1, x2, y2, sceen[x1][y1].color.b, sceen[x2][y1].color.b, sceen[x2][y2].color.b, sceen[x1][y2].color.b, x, y)
          sceen[x][y].color = new Color(r, g, b)
        } else {
          r = Beline_Interpole(x1, y1, x, y, sceen[x1][y1].color.r, sceen[x][y1].color.r, sceen[x][y].color.r, sceen[x1][y].color.r, x, y)
          g = Beline_Interpole(x1, y1, x, y, sceen[x1][y1].color.g, sceen[x][y1].color.g, sceen[x][y].color.g, sceen[x1][y].color.g, x, y)
          b = Beline_Interpole(x1, y1, x, y, sceen[x1][y1].color.b, sceen[x][y1].color.b, sceen[x][y].color.b, sceen[x1][y].color.b, x, y)
          sceen[x][y].color = new Color(r, g, b)
        }
      }
      sceen[x][y].draw()
    }
  }

}, 20)
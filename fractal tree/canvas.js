var y = 0
ctx.fillStyle = "#FFFFFF"
setInterval(function () {
    ctx.fillRect(0, 0, width, height)
    branches = [new Branch(width/2, height, width/2, height - y)]
    angle = inp.value-0
    angBetween = inp2.value-0
    ctx.beginPath()

    for (i = 0; i < branches.length; i++) {
        branches[i].draw()
        if (branches[i].length() < 0.1) {break}
        branches[i].update()
        branches[i].update()
    }
    ctx.closePath()
    ctx.stroke()
    if (height-y >= height/2) {y++}
}, 10)
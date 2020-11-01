window.onkeypress = function() {
	console.log(event)
	if (event.key == "a") {}
}

window.onmousedown = function() {
	block.MoveDown()
	block1.MoveDown()
	console.log(scene)
}

scene = []
for (i = 0; i < 10; i++) {
	scene[i] = []
}

height = ctx.canvas.height
width = height * 9 / 16
zeroCord = new Vector2(ctx.canvas.width/2 - width/2, 0)

var block = new Block(0, 0)
var block1 = new Block(0, -2)

setInterval(function() {
	ctx.fillStyle = "#888888"
	ctx.fillRect(zeroCord.x, zeroCord.y, width, height)

	block.draw()
	block1.draw()
}, 10)
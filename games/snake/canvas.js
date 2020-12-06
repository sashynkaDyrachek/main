ctx.fillStyle = "#FFFFFF"
axis = new Vector2(0, 0)
v = 123456789
score = 0

ctx.canvas.onclick = function () {
	head.eat()
}

window.onkeydown = function(event) {
	if (event.key == "w" || event.key == "ArrowUp") {axis.y = -1; axis.x = 0}
	if (event.key == "a" || event.key == "ArrowLeft") {axis.x = -1; axis.y = 0}
	if (event.key == "s" || event.key == "ArrowDown") {axis.y = 1; axis.x = 0}
	if (event.key == "d" || event.key == "ArrowRight") {axis.x = 1; axis.y = 0}
	console.log(event.key)
}

/*window.onkeyup = function() {
	axis = new Vector2(0, 0)
}*/

var scene = []
var pixSize = 20
for (var x = 0; x < Math.floor(width/pixSize); x++) {
	scene[x] = []
}

var head = new Head(30, 30)
var apple = new Apple()
apple.spawn()

setInterval(function() {
	ctx.fillRect(0, 0, width, height)

	if (axis.x != 0 || axis.y != 0) {head.move(axis)}

	if (head.pos.x == apple.pos.x && head.pos.y == apple.pos.y) {
		head.eat()
		apple.spawn()
		score += 1
	}

	document.getElementById("score").innerHTML = score
	apple.draw()
	head.draw()
}, 50)
var input = new Inp();

window.onmousemove = function() {
	input.mousePos = new Vector2(event.clientX, event.clientY);
}
window.onkeydown = function() {
	input.keyPressed = event.key
}
window.onkeyup = function() {
	input.keyPressed = " "
}

var ray = new Ray2(50, 150);
var ellipse = new Ellipse(150, 150, 20)
var square = new Square(150, 150, 20)

width = ctx.canvas.width
height = ctx.canvas.height

setInterval(function loop() {
	ctx.fillStyle = "#FFFFFF"
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
	ctx.fillStyle = "#000000"

	ray.lookAt(input.mousePos)
	ray.March(ray.vect, square)

	//ellipse.draw()
	square.draw()

}, 1)
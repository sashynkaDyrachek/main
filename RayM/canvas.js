var input = new Inp();

window.onmousemove = function() {
	input.mousePos = new Vector2(event.clientX, event.clientY);
}
window.onkeydown = function() {
	input.keyPressed = event.key

	if (input.keyPressed == "w") {ray.pos.x += 1}
	if (input.keyPressed == "s") {ray.pos.x -= 1}
	if (input.keyPressed == "d") {ray.pos.z += 1}
	if (input.keyPressed == "a") {ray.pos.z -= 1}
	if (input.keyPressed == "f") {ray.pos.y += 1}
	if (input.keyPressed == "r") {ray.pos.y -= 1}
	if (input.keyPressed == "2") {offsetY += 1}
	if (input.keyPressed == "8") {offsetY -= 1}
	if (input.keyPressed == "6") {offsetX += 1}
	if (input.keyPressed == "4") {offsetX -= 1}

	if (input.keyPressed == "y") {sphere.pos.x += 1}
	if (input.keyPressed == "h") {sphere.pos.x -= 1}
	if (input.keyPressed == "j") {sphere.pos.z += 1}
	if (input.keyPressed == "g") {sphere.pos.z -= 1}
	if (input.keyPressed == "k") {sphere.pos.y += 1}
	if (input.keyPressed == "i") {sphere.pos.y -= 1}
}
window.onkeyup = function() {
	input.keyPressed = ""
}
window.onmousedown = function() {
	lightRay.pos = new Vector3(input.mousePos.x, input.mousePos.y, 0)
}

v = 1234567890123456

//Octahedron Sphere Box Plane Thorus
var ray = new Ray3(50, 150, 20);
var lightRay = new Ray3(85, 85, 0);
var sphere = new Sphere(150, 150, 10, 20)
var box = new Box(150, 150, 10, 15)
var plane = new Plane(0, 200, 0)

var lightObj = new Sphere(85, 85, 0, 0)

objects = [sphere, plane, box, lightObj]

pix = ctx1.canvas.height/5

w = ctx1.canvas.width/pix
h = ctx1.canvas.height/pix

offsetY = -250
offsetX = -90
setInterval(function loop() {
	//box.rotation.y += 0.1
	//box.rotation.x += 0.1

	lightObj.pos = lightRay.pos

	document.getElementById("Output").innerHTML = ray.pos.x + ", " + ray.pos.y + ", " + ray.pos.z


	/*ctx.moveTo(ray.pos.x, ray.pos.y)
	let q = new Vector2(Math.sin(offsetY * (90/pix) * (Math.PI/180)), -Math.cos(offsetY * (90/pix) * (Math.PI/180))).setLength(100)
	ctx.lineTo(ray.pos.x + q.x, ray.pos.y + q.y)
	ctx.moveTo(ray.pos.x, ray.pos.y)
	q = new Vector2(Math.sin((pix + offsetY) * (90/pix) * (Math.PI/180)), -Math.cos((pix + offsetY) * (90/pix) * (Math.PI/180))).setLength(100)
	ctx.lineTo(ray.pos.x + q.x, ray.pos.y + q.y)
	ctx.stroke()*/

	for (x = 0; x < pix; x++) {
		for (y = 0; y < pix; y++) {
			fillStyle1 = ray.March(new Vector3(-Math.sin((y + offsetY) * (90/pix) * (Math.PI/180)), Math.cos((y + offsetY) * (90/pix) * (Math.PI/180)), Math.sin((offsetX + x) * (90/pix) * (Math.PI/180))))
			if (!!fillStyle1) {
				lightRay.lookAt(fillStyle1)
				lighted = lightRay.March(lightRay.vect, true)
				if (Math.floor(lighted.x) == Math.floor(fillStyle1.x)) {
					operations = (200 - Math.floor(operations)).toString(16)
					if (operations.length == 1) {operations = "0" + operations}
					ctx1.fillStyle = "#" + operations + operations + operations
				} else {ctx1.fillStyle = "#000000"}
			} else {ctx1.fillStyle = "#FFFFFF"}


			ctx1.fillRect(x * w, y * h, w, h)
		}
	}

	/*new Ellipse(sphere.pos.x, sphere.pos.y, sphere.r).draw()
	Dine(0, plane.y, ctx.canvas.width, plane.y)
	new Square(lightRay.pos.x, lightRay.pos.y, 6).draw()
	new Square(box.pos.x, box.pos.y, box.s*2).draw()*/

}, 0.01)
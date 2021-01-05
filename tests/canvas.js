window.onkeydown = function(event) {
	if (event.key == "x") {offx+= pl}
	if (event.key == "y") {offy+= pl}
	if (event.key == "z") {offz+=0.1 * pl}
	if (event.key == "h") {h+= pl}
	if (event.key == "+") {pl = 1}
	if (event.key == "-") {pl = -1}
}

v = 123456789123456

h = 10

var zoom = 200

pw = width/zoom
ph = height/zoom

offx = 1000
offy = 1000
offz = 1000

setInterval(function() {
	ctx.fillStyle = "#FFFFFF"
	ctx.fillRect(0, 0, width, height)

	ctx.beginPath()

	ctx.moveTo(0, height/2)

	for (var x = 0; x < zoom; x++) {
		for (var y = 0; y < zoom; y++) {
			//var w = simplex(x, h)

			var q = simplex3(x + offx, y + offy, offz, h)
			//var q = Belerp(0, 0, width, height, 127, 0, 64, 64, pw * x, ph * y)
			var w = Interval(q, 0, 255).toString(16)
			if (w.length == 1) {w = "0" + w}
			//var w = Interval(q, 0, height)

			ctx.fillStyle = "#" + w + w + w
			ctx.fillRect(pw * x, ph * y, pw, ph)
			//ctx.lineTo(pw * x, height - w)
		}
	}
	//offz ++
	//offx ++
	//offy ++
	ctx.stroke()
}, 100)
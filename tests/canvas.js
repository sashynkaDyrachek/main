function simplex(x, w) {
	var xw = Math.floor(x/w)*w
	var y = Line_Interpole(0, Interval(Srandom(v*xw), 0, 255), w, Interval(Srandom(v*(xw+w)), 0, 255), x%w)
	//var y = Interval(Srandom(v * x), 0, height/2)
	return Math.floor(y)
}

function simplex2(x, y, w) {
	return simplex(x, w)/2 + simplex(y, w)/2
}

ctx.canvas.onclick = function() {
	h++
}

v = 8339776474

pw = width/50
ph = height/50

h = 1

offx = 0
offy = 0
offz = 0

setInterval(function() {
	ctx.fillStyle = "#FFFFFF"
	ctx.fillRect(0, 0, width, height)

	ctx.beginPath()

	ctx.moveTo(0, height/2)

	for (var x = 0; x < 50; x++) {
		for (var y = 0; y < 50; y++) {
			//var w = ((simplex2(offx + x, offy + y, h) + simplex2(offx + x, offy + y, h+1))/2).toString(16)
			var w = (255 - simplex2(offx + x, offy + y, h)).toString(16)
			ctx.fillStyle = "#" + w + w + w
			ctx.fillRect(pw * x, ph * y, pw, ph)
			//ctx.lineTo(pw * x, height/2 + w)
		}
	}
	//offx ++
	//offy ++
	ctx.stroke()
}, 100)
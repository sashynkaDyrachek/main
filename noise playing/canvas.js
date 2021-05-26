function random1(x) {
	return v%x
}

function random2(x, y) {
	return (v * y)%(x + y)
}

function random3(x, y, z) {
	return ((v * y)%(x + z))
}

function simplex(x, h) {
	var zx = Math.floor(x/h)*h
	return Lerp(0, random1(zx), h, random1(zx+h), x%h)
}

function simplex2(x, y, h) {
	/*var zx = Math.floor(x/h)*h
	var zy = Math.floor(y/h)*h
	return Belerp(0, 0, h, h, random2(zx, zy), random2(zx + h, zy), random2(zx + h, zy + h), random2(zx, zy + h), x%h, y%h)*/
	return (simplex(x, h) + simplex(y, h))/2
}

function simplex3(x, y, z, h) {
	var zx = Math.floor(x/h)*h
	var zy = Math.floor(y/h)*h
	var zz = Math.floor(z/h)*h
	return Cuberp(0, 0, 0, h, h, h, random3(zx, zy, zz), random3(zx + h, zy, zz), random3(zx + h, zy + h, zz), random3(zx, zy + h, zz), random3(zx, zy, zz + h), random3(zx + h, zy, zz + h), random3(zx + h, zy + h, zz + h), random3(zx, zy + h, zz + h), x%h, y%y, z%h)
}

ctx.canvas.onclick = function() {
	h++
}

v = 123456789123456

h = 10

var zoom = 250

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
		for (var y = 0; y < 1; y++) {
			//var w = simplex(x, h)

			var q = simplex2(x + offx, y + offy, h)
			//var w = Interval(q, 0, 255).toString(16)
			var w = Interval(q, 0, height)

			/*ctx.fillStyle = "#" + w + w + w
			ctx.fillRect(pw * x, ph * y, pw, ph)*/
			ctx.lineTo(pw * x, height - w)
		}
	}
	//offz++
	//offx ++
	//offy ++
	ctx.stroke()
}, 100)
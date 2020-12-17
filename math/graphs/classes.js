const Interval = function(num, min, max) {
	let q = max - min + 1
	q = Math.abs(num) % q
	return min + q
}

const Lerp = function(x1, y1, x2, y2, x) {
	let P = y1 + ((y2 - y1)/(x2 - x1))*(x - x1)
	return P
}

const Belerp = function(x1, y1, x2, y2, z1, z2, z3, z4, x, y) {
	let P1 = Lerp(x1, z1, x2, z2, x)
	let P2 = Lerp(x2, z3, x1, z4, x)
	return Math.floor(Line_Interpole(y1, P1, y2, P2, y))
}

const Dine = function(x, y, ex, ey) {
	ctx.beginPath()
	ctx.moveTo(x, y);
	ctx.lineTo(ex, ey);
	ctx.stroke();
	ctx.closePath()
}
const length = function(Vector2, Vector21) {
	return Math.sqrt(Math.pow(Vector2.x - Vector21.x, 2) + Math.pow(Vector2.y - Vector21.y, 2))
}

const Elength = function(Vector2) {
	return Math.sqrt(Math.pow(Vector2.x, 2) + Math.pow(Vector2.y, 2))
}

const Srandom = function(seed) {
	let l = ("" + seed).length
	let q = "" + Math.pow(seed, 2)
	for (let i = q.length; i>l; i--) {
		q = +(Math.floor(q/10))
	}
	return Math.floor(q)
}

const Interval = function(num, min, max) {
	let q = max - min + 1
	q = num % q
	return min + q
}

const Line_Interpole = function(x1, y1, x2, y2, x) {
	let P = y1 + ((y2 - y1)/(x2 - x1))*(x - x1)
	return P
}

const Beline_Interpole = function(x1, y1, x2, y2, z1, z2, z3, z4, x, y) {
	let P1 = Line_Interpole(x1, z1, x2, z2, x)
	let P2 = Line_Interpole(x2, z3, x1, z4, x)
	return Math.floor(Line_Interpole(y1, P1, y2, P2, y))
}

const Vector2 = function(x, y) {
	this.x = x;
	this.y = y;

	this.normalize = function () {
   		let q = Elength(this)
   		this.x /= q
   		this.y /= q
   		return this
  	}

  	this.setLength = function (q) {
  		this.normalize()
  		this.x *= q
  		this.y *= q
   		return this
  	}

  	this.getLength = function() {
  		return Elength(this)
  	}
}

const Color = function (r, g, b) {
	this.r = r
	this.g = g
	this.b = b
}

const Inp = function() {
	this.mousePos = new Vector2(1, 1);
	this.mousePressed = -1;
	this.keyPressed = " ";
}

const Dine = function(x, y, ex, ey) {
	ctx.beginPath()
	ctx.moveTo(x, y);
	ctx.lineTo(ex, ey);
	ctx.stroke();
	ctx.closePath()
}

const Drect = function(x, y, wx, wy) {
	ctx.beginPath()
	ctx.moveTo(x - wx, y - wy);
	ctx.lineTo(x + wx, y - wy);
	ctx.lineTo(x + wx, y + wy);
	ctx.lineTo(x - wx, y + wy);
	ctx.lineTo(x - wx, y - wy);
	ctx.stroke();
	ctx.closePath()
}

const Pixel = function (x, y, w, h, r, g, b) {
	this.pos = new Vector2(x, y)
	this.s = new Vector2(w, h)
	this.color = new Color(r, g, b)

	this.draw = function() {
		if (this.color.r < 10) {this.color.r = "0"+this.color.r}
		if (this.color.g < 10) {this.color.g = "0"+this.color.g}
		if (this.color.b < 10) {this.color.b = "0"+this.color.b}
		ctx.fillStyle = "#" + this.color.r + this.color.g + this.color.b
		ctx.fillRect(x-w, y-h, w*2, h*2)
		this.color = new Color(+this.color.r, +this.color.g, +this.color.b)
	}
}

const Line = function(x, y, ex, ey) {
	this.pos = new Vector2(x, y)
	this.end = new Vector2(ex, ey)

	this.draw = function() {
		Dine(this.pos.x, this.pos.y, this.end.x, this.end.y)
	}

	this.translate = function(p) {
		this.pos.x += p.x;
		this.pos.y += p.y;
	}
}
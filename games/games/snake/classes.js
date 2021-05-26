const Vector2 = function (x, y) {
this.x = x
this.y = y

this.copy = function() {
	return new Vector2(this.x, this.y)
	}
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

const Head = function (x, y) {
	this.pos = new Vector2(x, y)
	this.tail = []
	this.draw = function() {
		ctx.strokeRect(this.pos.x * pixSize, this.pos.y * pixSize, pixSize, pixSize)
	for (var i = 0; i < this.tail.length; i++) {
		ctx.strokeRect(this.tail[i].x * pixSize, this.tail[i].y * pixSize, pixSize, pixSize)
	}
}

this.move = function(vect) {
	for (var i = this.tail.length-1; i >= 0; i--) {
		if (i == 0) {this.tail[i] = this.pos.copy()}
		else {
			this.tail[i] = this.tail[i-1].copy()
			if (this.tail[i].x == this.pos.x && this.tail[i].y == this.pos.y) {
				this.tail = []
				this.pos = new Vector2(30, 30)
				score = 0
				return
			}
		}
	}
	this.pos.x += vect.x
	this.pos.y += vect.y
	if (this.pos.x >= Math.floor(width/pixSize) || this.pos.y >= Math.floor(height/pixSize) || this.pos.x <= 0 || this.pos.y <= 0) {
			this.tail = []
			this.pos = new Vector2(30, 30)
			score = 0
		}
	}

	this.eat = function() {
		if (this.tail.length == 0) {this.tail[this.tail.length] = new Vector2(0, 0)}
		else {this.tail[this.tail.length] = this.tail[this.tail.length-1]}
	}
}

const Apple = function() {
	this.pos = new Vector2(15, 15)

	this.spawn = function() {
		v = Srandom(v)
		this.pos.x = Interval(v, 0, Math.floor(width/pixSize)-1)
		v = Srandom(v)
		this.pos.y = Interval(v, 0, Math.floor(height/pixSize)-1)
	}

	this.draw = function() {
		ctx.fillStyle = "#00FF00"
		ctx.fillRect(this.pos.x * pixSize, this.pos.y * pixSize, pixSize, pixSize)
		ctx.fillStyle = "#FFFFFF"
	}
}
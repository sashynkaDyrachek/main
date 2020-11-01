
const length = function(Vector2) {
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

const Lerp = function(x1, y1, x2, y2, x) {
	let P = y1 + ((y2 - y1)/(x2 - x1))*(x - x1)
	return P
}

const Belerp = function(x1, y1, x2, y2, z1, z2, z3, z4, x, y) {
	let P1 = Lerp(x1, z1, x2, z2, x)
	let P2 = Lerp(x2, z3, x1, z4, x)
	return Math.floor(Lerp(y1, P1, y2, P2, y))
}

const Vector2 = function(x, y) {
	this.x = x;
	this.y = y;

	this.normalize = function () {
   		let q = length(this)
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
  		return length(this)
  	}
}

const Color = function (r, g, b) {
	this.r = r
	this.g = g
	this.b = b
}

const Physics = function (obj, m) {
	this.layer = 0;
	this.velocity = new Vector2(0, 0);
	this.m = m;
	this.obj = obj;

	this.addVelocity = function(vel2) {
		this.velocity = new Vector2(this.velocity.x + vel2.x, this.velocity.y + vel2.y)
	}

	this.update = function() {
		this.velocity = new Vector2(this.velocity.x/1.01, this.velocity.y/1.01)
		if (this.velocity.getLength() >= this.obj.r) {this.velocity = new Vector2(this.velocity.x/2, this.velocity.y/2)}
		this.addVelocity(new Vector2(0, 0.098))
		this.obj.translate(this.velocity)
		for (var i = 0; i < layers[this.layer].length; i++) {
			Lobj = layers[this.layer][i]
			if (this.obj.pos.x == Lobj.pos.x && this.obj.pos.y == Lobj.pos.y && this.obj.r == Lobj.r) {continue}
			q = this.obj.getDist(Lobj.pos) - Lobj.getEDist(this.obj.pos)
			if (q < 0) {
				this.addVelocity(new Vector2(Lobj.pos.x - obj.pos.x, Lobj.pos.y - obj.pos.y).setLength(q/5))

			}
		}
		if (this.obj.pos.y + this.obj.r > ctx.canvas.height) {
			this.addVelocity(new Vector2(0, -1).setLength(-(this.obj.getDist(new Vector2(obj.pos.x, ctx.canvas.height)))/5))
		}
		if (this.obj.pos.y - this.obj.r < 0) {
			this.addVelocity(new Vector2(0, 1).setLength(-(this.obj.getDist(new Vector2(obj.pos.x, 0)))/5))
		}
		if (this.obj.pos.x + this.obj.r > ctx.canvas.width) {
			this.addVelocity(new Vector2(-1, 0).setLength(-(this.obj.getDist(new Vector2(ctx.canvas.width, obj.pos.y)))/5))
		}
		if (this.obj.pos.x - this.obj.r < 0) {
			this.addVelocity(new Vector2(1, 0).setLength(-(this.obj.getDist(new Vector2(0, obj.pos.y)))/5))
		}
		//new Ray(obj.pos.x, obj.pos.y, this.velocity.x, this.velocity.y).norm(10).draw()
	}

	this.joint = function(Lobj) {
		q = new Vector2(Lobj.pos.x - this.obj.pos.x, Lobj.pos.y -this. obj.pos.y)
		w = q.getLength()
		q = q.setLength(this.m * Lobj.physics.m / w / w)
		new Ray(this.obj.pos.x, this.obj.pos.y, q.x*10, q.y*10).draw()
		this.addVelocity(q)
		//this.obj.translate(this.velocity)
	}
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

const Ellipse = function (x, y, r) {
	this.pos = new Vector2(x, y);
	this.r = r;
	this.physics = new Physics(this, r)

	this.translate = function(p) {
		this.pos.x += p.x;
		this.pos.y += p.y;
	}

	this.draw = function() {
		ctx.beginPath()
		ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI*2, true);
		ctx.stroke();
		ctx.closePath()
	}
}

const Square = function (x, y, s) {
	this.pos = new Vector2 (x, y);
	this.s = s/2;
	this.physics = new Physics(this)

	this.translate = function(p) {
		this.pos.x += p.x;
		this.pos.y += p.y;
	}
			
	this.draw = function() {
		ctx.beginPath()
		ctx.moveTo(this.pos.x-this.s, this.pos.y-this.s)
		ctx.lineTo(this.pos.x+this.s, this.pos.y-this.s)
		ctx.lineTo(this.pos.x+this.s, this.pos.y+this.s)
		ctx.lineTo(this.pos.x-this.s, this.pos.y+this.s)
		ctx.lineTo(this.pos.x-this.s, this.pos.y-this.s)
		ctx.stroke()
	}
}

const Rectangle = function(x, y, sx, sy) {
	this.pos = new Vector2 (x, y);
	this.s = new Vector2(sx/2, sy/2);
	this.physics = new Physics(this)

	this.translate = function(p) {
		this.pos.x += p.x;
		this.pos.y += p.y;
	}

	this.draw = function() {
		ctx.beginPath()
		ctx.moveTo(this.pos.x-this.s.x, this.pos.y-this.s.y)
		ctx.lineTo(this.pos.x+this.s.x, this.pos.y-this.s.y)
		ctx.lineTo(this.pos.x+this.s.x, this.pos.y+this.s.y)
		ctx.lineTo(this.pos.x-this.s.x, this.pos.y+this.s.y)
		ctx.lineTo(this.pos.x-this.s.x, this.pos.y-this.s.y)
		ctx.stroke()
	}
}

const Ray = function(x, y, vectX = 1, vectY = 0) {
	this.pos = new Vector2(x, y);
	this.vect = new Vector2(vectX, vectY);

  	this.norm = function(q) {
  		this.vect.normalize()
   		this.vect.x *= q
   		this.vect.y *= q
   		return this
  	}

	this.lookAt = function(pos) {
		this.vect.x = pos.x - this.pos.x;
		this.vect.y = pos.y - this.pos.y;
		this.vect.normalize()
		return this
	}

	this.look = function(pos) {
		this.vect.x = pos.x - this.pos.x;
		this.vect.y = pos.y - this.pos.y;
	}

	this.draw = function() {
		Dine(this.pos.x, this.pos.y, this.pos.x + this.vect.x, this.pos.y + this.vect.y)
	}

	this.cast = function(line) {
		x1 = line.pos.x
		y1 = line.pos.y
		x2 = line.end.x
		y2 = line.end.y
		x3 = this.pos.x
		y3 = this.pos.y
		x4 = this.pos.x + this.vect.x
		y4 = this.pos.y + this.vect.y
		d = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
		if (d == 0) {return}
		t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4))/d
		u = -((x1 - x2) * (y1 - y3) - (y1 - y2) * (x1 - x3))/d
		if (u >= 0 && 0 <= t && t <= 1) {
			p = new Vector2(x1 + t * (x2 - x1), y3 + u * (y4 - y3))
			return p;
		}
	}
}
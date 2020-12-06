layers = []

const length = function(Vector2, Vector21) {
	return Math.sqrt(Math.pow(Vector2.x - Vector21.x, 2) + Math.pow(Vector2.y - Vector21.y, 2))
}

const Elength = function(Vector2) {
	return Math.sqrt(Math.pow(Vector2.x, 2) + Math.pow(Vector2.y, 2))
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
	return Math.floor(Line_Interpole(y1, P1, y2, P2, y))
}

const Vector2 = function(x, y) {
	this.x = x;
	this.y = y;

	this.normalize = function () {
   		var q = Elength(this)
   		if (q == 0) {return this}
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

  	this.copy = function () {
  		return new Vector2(this.x, this.y)
  	}
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
			var Lobj = layers[this.layer][i]
			if (this.obj.pos.x == Lobj.pos.x && this.obj.pos.y == Lobj.pos.y && this.obj.r == Lobj.r) {continue}
			q = this.obj.getDist(Lobj.pos) - Lobj.getEDist(this.obj.pos)
			if (q < 0) {
				this.addVelocity(new Vector2(Lobj.pos.x - obj.pos.x, Lobj.pos.y - obj.pos.y).setLength(q/5))

			}
		}
		if (this.obj.pos.y + this.obj.r > ctx.canvas.height) {
			this.addVelocity(new Vector2(0, -1).setLength((this.obj.getDist(new Vector2(obj.pos.x, ctx.canvas.height)))/5))
		}
		if (this.obj.pos.y - this.obj.r < 0) {
			this.addVelocity(new Vector2(0, 1).setLength((this.obj.getDist(new Vector2(obj.pos.x, 0)))/5))
		}
		if (this.obj.pos.x + this.obj.r > ctx.canvas.width) {
			this.addVelocity(new Vector2(-1, 0).setLength((this.obj.getDist(new Vector2(ctx.canvas.width, obj.pos.y)))/5))
		}
		if (this.obj.pos.x - this.obj.r < 0) {
			this.addVelocity(new Vector2(1, 0).setLength((this.obj.getDist(new Vector2(0, obj.pos.y)))/5))
		}
		//new Ray(obj.pos.x, obj.pos.y, this.velocity.x, this.velocity.y).norm(10).draw()
	}

	this.joint = function(Lobj) {
		//if (this.obj.pos.x == Lobj.pos.x && this.obj.pos.y == Lobj.pos.y && this.obj.r == Lobj.r) {continue}
		q = new Vector2(Lobj.pos.x - this.obj.pos.x, Lobj.pos.y - this.obj.pos.y)
		q = q.setLength(Math.floor((this.m*Lobj.physics.m)/(q.getLength()**2)))
		new Ray(this.obj.pos.x, this.obj.pos.y, q.x, q.y).draw()
		this.addVelocity(q)
		//this.obj.translate(this.velocity)
	}
}

const Inp = function() {
	this.mousePos = new Vector2(1, 1);
	this.mousePressed = -1;
	this.keyPressed = " ";
	this.axis = new Vector2(0, 0)
}

const Dine = function(x, y, ex, ey) {
	ctx.beginPath()
	ctx.moveTo(x, y);
	ctx.lineTo(ex, ey);
	ctx.stroke();
	ctx.closePath()
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

const Ellipse = function (x, y, r, m) {
	this.pos = new Vector2(x, y);
	this.r = r;
	this.physics = new Physics(this, m)

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

	this.getDist = function(p) {
		return length(p, this.pos) - this.r
	}

	this.getEDist = function(p) {
		return this.r
	}
}

const Square = function (x, y, s) {
	this.pos = new Vector2 (x, y);
	this.r = s/2;
	this.physics = new Physics(this)

	this.translate = function(p) {
		this.pos.x += p.x;
		this.pos.y += p.y;
	}
			
	this.draw = function() {
		ctx.beginPath()
		ctx.moveTo(this.pos.x-this.r, this.pos.y-this.r)
		ctx.lineTo(this.pos.x+this.r, this.pos.y-this.r)
		ctx.lineTo(this.pos.x+this.r, this.pos.y+this.r)
		ctx.lineTo(this.pos.x-this.r, this.pos.y+this.r)
		ctx.lineTo(this.pos.x-this.r, this.pos.y-this.r)
		ctx.stroke()
	}

	this.getEDist = function(p) {
		var q = new Vector2(this.pos.x - p.x, this.pos.y - p.y)
  		return Elength(q) - this.getDist(p)
	}

	this.getDist = function(p) {
		var q = new Vector2(Math.abs(p.x - this.pos.x) - this.r, Math.abs(p.y - this.pos.y) - this.r);
  		return Math.abs(Elength(new Vector2(Math.max(q.x, 0), Math.max(q.y, 0))) + Math.min(Math.max(q.x, q.y), 0));
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

	this.getEDist = function(p) {
  		offset = new Vector2(Math.abs(p.x - rectangle.pos.x) - this.s.x, Math.abs(p.y - this.pos.y) - this.s.y)
  		a = Math.max(Elength(offset), 0)
  		b = Math.max(Math.min(offset.x, offset.y, 0))
  		return Math.floor(a + b)
	}

	this.getDist = function(p) {
		return length(p, this.pos)-this.getEDist(p)
	}
}

const Ray = function(x, y, vectX = 0, vectY = 0) {
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
		return this
	}

	this.draw = function() {
		Dine(this.pos.x, this.pos.y, this.pos.x + this.vect.x, this.pos.y + this.vect.y)
	}
}
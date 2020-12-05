layers = []

const length = function(Vector2, Vector21) {
	return Math.sqrt(Math.pow(Vector2.x - Vector21.x, 2) + Math.pow(Vector2.y - Vector21.y, 2))
}

const Elength = function(Vector2) {
	return Math.sqrt(Math.pow(Vector2.x, 2) + Math.pow(Vector2.y, 2))
}

const Vector2 = function(x, y) {
	this.x = x;
	this.y = y;

	this.normalize = function () {
   		var q = Elength(this)
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

	this.getEDist = function(p) {
		vect = new Vector2(this.pos.x - p.x, this.pos.y - p.y)
		q = Math.max(Math.abs(vect.x), Math.abs(vect.y))
		vect.x = (vect.x/q)*this.s.x
		vect.y = (vect.y/q)*this.s.y
		new Ray(this.pos.x, this.pos.y, vect.x, vect.y).draw()
		return Elength(vect)
	}

	this.getDist = function(p) {
		return -length(p, this.pos)-this.getEDist(p)
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
	}

	this.draw = function() {
		Dine(this.pos.x, this.pos.y, this.pos.x + this.vect.x, this.pos.y + this.vect.y)
	}
}
const length2 = function(Vector2, Vector21) {
	return Math.sqrt(Math.pow(Vector2.x - Vector21.x, 2) + Math.pow(Vector2.y - Vector21.y, 2))
}

const length3 = function(Vector3, Vector31) {
	return Math.sqrt(Math.pow(Vector3.x - Vector31.x, 2) + Math.pow(Vector3.y - Vector31.y, 2) + Math.pow(Vector3.z - Vector31.z, 2))
}

const Elength2 = function(Vector2) {
	return Math.sqrt(Math.pow(Vector2.x, 2) + Math.pow(Vector2.y, 2))
}

const Elength3 = function(Vector3) {
	return Math.sqrt(Math.pow(Vector3.x, 2) + Math.pow(Vector3.y, 2) + Math.pow(Vector3.z, 2))
}

const Vector2 = function(x, y) {
	this.x = x;
	this.y = y;

	this.normalize = function () {
   		let q = Elength2(this)
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
  		return Elength2(this)
  	}

  	this.translate = function(Vector2) {
  		this.x += Vector2.x
  		this.y += Vector2.y
  	}
}


const Vector3 = function(x, y, z) {
	this.x = x;
	this.y = y;
	this.z = z;

	this.normalize = function () {
   		let q = Elength3(this)
   		this.x /= q
   		this.y /= q
   		this.z /= q
   		return this
  	}

  	this.setLength = function (q) {
  		this.normalize()
  		this.x *= q
  		this.y *= q
  		this.z *= q
   		return this
  	}

  	this.getLength = function() {
  		return Elength3(this)
  	}

  	this.translate = function(Vector2) {
  		this.x += Vector2.x
  		this.y += Vector2.y
  		this.z += Vector2.z
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
}

const Pixel = function(x, y) {
	this.x = x
	this.y = y
	this.col = 0
}

const Ellipse = function (x, y, r) {
	this.pos = new Vector2(x, y);
	this.r = r;
	this.type = "ellipse"

	this.draw = function() {
		ctx.beginPath()
		ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI*2, true);
		ctx.stroke();
		ctx.closePath()
	}

	this.getLen = function(p) {
		return length2(this.pos, p) - this.r - (Math.sin(p.x)*10)
	}
}

const Sphere = function (x, y, z, r) {
	this.pos = new Vector3(x, y, z)
	this.r = r

	this.getLen =function(p) {
		return length3(this.pos, p) - this.r
	}
}

const Square = function (x, y, s) {
	this.pos = new Vector2 (x, y);
	this.s = s;
			
	this.draw = function() {
		ctx.fillRect(this.pos.x - this.s/2, this.pos.y - this.s/2, this.s, this.s);
	}

	this.getLen = function(p) {
		var q = new Vector2(Math.abs(p.x - this.pos.x) - this.s/2, Math.abs(p.y - this.pos.y) - this.s/2);
  		return Math.abs(Elength2(new Vector2(Math.max(q.x, 0), Math.max(q.y, 0))) + Math.min(Math.max(q.x, q.y), 0));
	}
}

const Box = function (x, y, z, s) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.s = s;

	this.getLen = function(p) {
		p = new Vector3(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z))
		let q = new Vector3(p.x - this.x, p.y - this.y, p.z - this.z)
		return Elength3(q) - Math.max(q.x, q.y, q.z)
	}
}

const Plane = function (y) {
	this.y = y;

	this.getLen = function(p) {
		return length3(p, new Vector3(p.x, this.y, p.z))
	}
}

const Ray2 = function(x, y) {
	this.pos = new Vector2(x, y);
	this.vect = new Vector2(1, 0);

	this.normalize = function () {
   		q = Elength2(this.vect)
   		this.vect.x /= q
   		this.vect.y /= q
  	}

  	this.norm = function(q) {
  		this.normalize()
   		this.vect.x *= q
   		this.vect.y *= q
  	}

	this.lookAt = function(pos) {
		this.vect.x = pos.x - this.pos.x;
		this.vect.y = pos.y - this.pos.y;
		this.normalize()
	}

	this.look = function(pos) {
		this.vect.x = pos.x - this.pos.x;
		this.vect.y = pos.y - this.pos.y;
	}

	this.draw = function() {
		Dine(this.pos.x, this.pos.y, this.pos.x + this.vect.x, this.pos.y + this.vect.y)
	}

	this.March = function(vect, object) {
		p = this.pos
		this.vect = vect
		this.normalize()
		for (i=0; i<100; i++) {
			l = object.getLen(p)
			if (l < 1) {return i}
			if (l > 1000) {return false}
			new Ellipse(p.x, p.y, l).draw()
			Dine(this.pos.x, this.pos.y, p.x, p.y)
			p = new Vector2(p.x + this.vect.x * l, p.y + this.vect.y * l)
		}
		return false
	}
}

const Ray3 = function(x, y, z) {
	this.pos = new Vector3(x, y, z)
	this.vect = new Vector3(1, 1, 1)

	this.normalize = function() {
		q = Elength3(this.vect)
		this.vect.x /= q
		this.vect.y /= q
		this.vect.z /= q
	}

	this.lookAt = function(p) {
		this.vect.x = p.x - this.pos.x
		this.vect.y = p.y - this.pos.y
		this.vect.z = p.z - this.pos.z
		this.normalize()
	}

	this.March = function(vect, objects) {
		p = this.pos
		this.vect = vect
		let sphere = objects[0]
		let plane = objects[1]
		this.normalize()
		for (i=0; i<100; i++) {
			l = Math.min(sphere.getLen(p), plane.getLen(p))
			if (l < 1) {return i}
			if (l > 100) {return false}
			new Ellipse(p.x, p.y, l).draw()
			Dine(this.pos.x, this.pos.y, p.x, p.y)
			p = new Vector3(p.x + this.vect.x * l, p.y + this.vect.y * l, p.z + this.vect.z * l)
		}
		return false
	}
}
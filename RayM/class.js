const rgb = function(r, g, b) {
	return r.toString(16) + g.toString(16) + b.toString(16)
}

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

const ToColor = function (r, g, b) {
}

const Line_Interpole = function(x1, y1, x2, y2, x) {
	let P = y1 + ((y2 - y1)/(x2 - x1))*(x - x1)
	return P
}

const Interval = function(num, min, max) {
	let q = max - min + 1
	q = num % q
	return min + q
}

const mix = function (d1, d2, d3) {
	return (d1 + d2 + d3) / 3
}

const smin = function (d1, d2, k) {
    var h = Math.max(k - Math.abs(d1 - d2), 0.0);
    return Math.min(d1, d2) - h * h * 0.25 / k;
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

  	this.copy = function() {
  		return new Vector3(this.x, this.y, this.z)
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

	this.draw = function() {
		ctx.beginPath()
		ctx.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI*2, true);
		ctx.stroke();
		ctx.closePath()
	}

	this.getLen = function(p) {
		return length2(this.pos, p) - this.r 
	}
}

const Square = function (x, y, s) {
	this.pos = new Vector2 (x, y);
	this.s = s;
			
	this.draw = function() {
		ctx.fillRect(this.pos.x - this.s/2, this.pos.y - this.s/2, this.s, this.s);
	}
}

const Sphere = function (x, y, z, r) {
	this.pos = new Vector3(x, y, z)
	this.r = r

	this.getLen = function(p) {
		var p = p.copy()
		p = new Vector3(this.pos.x - p.x, this.pos.y - p.y, this.pos.z - p.z)
		return Elength3(p) - this.r
	}
}

const Thorus = function (x, y, z, d, t) {
	this.pos = new Vector3(x, y, z)
	this.rotation = new Vector3(0, 0, 0)
	this.d = d
	this.t = t

	this.getLen = function(p) {
		var p = p.copy()
		p = new Vector3(this.pos.x - p.x, this.pos.y - p.y, this.pos.z - p.z)
		p = new Vector3(p.x, p.y * Math.cos(this.rotation.x) - p.z * Math.sin(this.rotation.x), p.z * Math.cos(this.rotation.x) + p.y * Math.sin(this.rotation.x))
		p = new Vector3(p.x * Math.cos(this.rotation.y) - p.z * Math.sin(this.rotation.y), p.y, p.z * Math.cos(this.rotation.y) + p.x * Math.sin(this.rotation.y))
		p = new Vector3(p.x * Math.cos(this.rotation.z) - p.y * Math.sin(this.rotation.z), p.y * Math.cos(this.rotation.z) - p.x * Math.sin(this.rotation.z), p.z)
		var q = new Vector2(Elength2(p.x, p.z)-t, p.y)
		return Elength2(q) - d
	}
}

const Box = function (x, y, z, s) {
	this.pos = new Vector3(x, y, z)
	this.rotation = new Vector3(0, 0, 0)
	this.s = s;

	this.getLen = function(p) {
		var p = p.copy()
		p = new Vector3(this.pos.x - p.x, this.pos.y - p.y, this.pos.z - p.z)
		p = new Vector3(p.x, p.y * Math.cos(this.rotation.x) - p.z * Math.sin(this.rotation.x), p.z * Math.cos(this.rotation.x) + p.y * Math.sin(this.rotation.x))
		p = new Vector3(p.x * Math.cos(this.rotation.y) - p.z * Math.sin(this.rotation.y), p.y, p.z * Math.cos(this.rotation.y) + p.x * Math.sin(this.rotation.y))
		p = new Vector3(p.x * Math.cos(this.rotation.z) - p.y * Math.sin(this.rotation.z), p.y * Math.cos(this.rotation.z) - p.x * Math.sin(this.rotation.z), p.z)
		var q = new Vector3(Math.abs(p.x)  - this.s, Math.abs(p.y) - this.s, Math.abs(p.z) - this.s);
  		return Elength3(new Vector3(Math.max(q.x, 0), Math.max(q.y, 0), Math.max(q.z, 0))) + Math.min(Math.max(q.x, Math.max(q.y, q.z)), 0);
	}
}

const Octahedron = function(x, y, z, s) {
	this.pos = new Vector3(x, y, z)
	this.rotation = new Vector3(0, 0, 0)
	this.s = s

	this.getLen = function(p) {
		var p = p.copy()
		p = new Vector3(this.pos.x - p.x, this.pos.y - p.y, this.pos.z - p.z)
		p = new Vector3(p.x, p.y * Math.cos(this.rotation.x) - p.z * Math.sin(this.rotation.x), p.z * Math.cos(this.rotation.x) + p.y * Math.sin(this.rotation.x))
		p = new Vector3(p.x * Math.cos(this.rotation.y) - p.z * Math.sin(this.rotation.y), p.y, p.z * Math.cos(this.rotation.y) + p.x * Math.sin(this.rotation.y))
		p = new Vector3(p.x * Math.cos(this.rotation.z) - p.y * Math.sin(this.rotation.z), p.y * Math.cos(this.rotation.z) - p.x * Math.sin(this.rotation.z), p.z)
		var p = new Vector3(Math.abs(p.x), Math.abs(p.y), Math.abs(p.z))
		return p.x + p.y + p.z - this.s
	}
}

const Plane = function (x, y, z) {
	this.pos = new Vector3(x, y, z);
	this.rotation = new Vector3(0, 0, 0);

	this.getLen = function(p) {
		var p = p.copy()
		p = new Vector3(this.pos.x - p.x, this.pos.y - p.y, this.pos.z - p.z)
		p = new Vector3(p.x, p.y * Math.cos(this.rotation.x) - p.z * Math.sin(this.rotation.x), p.z * Math.cos(this.rotation.x) + p.y * Math.sin(this.rotation.x))
		p = new Vector3(p.x * Math.cos(this.rotation.y) - p.z * Math.sin(this.rotation.y), p.y, p.z * Math.cos(this.rotation.y) + p.x * Math.sin(this.rotation.y))
		p = new Vector3(p.x * Math.cos(this.rotation.z) - p.y * Math.sin(this.rotation.z), p.y * Math.cos(this.rotation.z) - p.x * Math.sin(this.rotation.z), p.z)
		return Math.abs(p.y)
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

	this.March = function(vect, sphere) {
		p = this.pos
		this.vect = vect
		this.normalize()
		for (i=0; i<100; i++) {
			l = sphere.getLen(p)
			if (l < 0.10) {return true}
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

	this.March = function(vect, main) {
		p = this.pos.copy()
		let sphere = objects[0]
		let plane = objects[1]
		let box = objects[2]
		let Light = objects[3]
		vect.normalize()
		for (let i=0; i<250; i++) {
			l = Math.min(Math.max(-sphere.getLen(p), box.getLen(p)), plane.getLen(p));
			if (l < 0.001) {
				if (main) {operations = i}
				return p
			}
			if (l > 200) {return false}
			p = new Vector3(p.x + vect.x * l, p.y + vect.y * l, p.z + vect.z * l)
		}
		return false
	}
}
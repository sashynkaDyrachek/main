const Pixel = function(x, y, on = false, block = false, andM = false, not = false) {
	this.x = x
	this.y = y
	this.on = on
	this.Fon = on
	this.tired = false
	this.andM = andM
	this.not = not
	this.block = block;

	this.draw = function() {
		if (this.on) {ctx.fillStyle = "#FF0000"}
		else if (this.tired) {ctx.fillStyle = "#0000FF"}
		else if (this.andM) {ctx.fillStyle = "#FFFF00"}
		else {ctx.fillStyle = "#F08000"}
		ctx.fillRect(this.x * s, this.y * s, s, s)
	}

	this.update = function() {
		if (this.tired) {this.tired = false; this.Fon = false; return}
		if (this.on) {this.tired = true}
		this.on = this.Fon
		var ons = 0;
		var x = this.x
		var y = this.y - 1
		if (pixels[x] != undefined && pixels[x][y] != undefined && pixels[x][y].on == true) {
			ons++
		}

		x = this.x - 1
		y = this.y - 1
		if (pixels[x] != undefined && pixels[x][y] != undefined && pixels[x][y].on == true) {
			ons++
		}

		x = this.x - 1
		y = this.y
		if (pixels[x] != undefined && pixels[x][y] != undefined && pixels[x][y].on == true) {
			ons++
		}

		x = this.x - 1
		y = this.y + 1
		if (pixels[x] != undefined && pixels[x][y] != undefined && pixels[x][y].on == true) {
			ons++
		}

		x = this.x
		y = this.y + 1
		if (pixels[x] != undefined && pixels[x][y] != undefined && pixels[x][y].Fon == true) {
			ons++
		}

		x = this.x + 1
		y = this.y + 1
		if (pixels[x] != undefined && pixels[x][y] != undefined && pixels[x][y].Fon == true) {
			ons++
		}

		x = this.x + 1
		y = this.y
		if (pixels[x] != undefined && pixels[x][y] != undefined && pixels[x][y].Fon == true) {
			ons++
		}

		x = this.x + 1
		y = this.y - 1
		if (pixels[x] != undefined && pixels[x][y] != undefined && pixels[x][y].Fon == true) {
			ons++
		}


		if (ons > 0 && ons < 3 && !this.tired && !this.andM) {this.Fon = true}
		if (ons >= 2 && !this.tired && this.andM) {this.Fon = true}
		if (this.not) {this.Fon = !this.Fon}
		//else if (this.on && !this.tired) {this.tired = true; this.Fon = false}
		pixels[this.x][this.y] = this
	}

	if (pixels[this.x] == undefined) {pixels[this.x] = []}
	pixels[this.x][this.y] = this
}
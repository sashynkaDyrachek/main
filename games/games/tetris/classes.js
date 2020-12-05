const Vector2 = function (x, y) {
	this.x = x;
	this.y = y;
}

const Block = function (x, y) {
	this.pos = new Vector2(x, y);

	scene[this.pos.x][this.pos.y] = this

	this.draw = function() {
		ctx.fillStyle = "#FF0000"
		ctx.fillRect(zeroCord.x + width/10 * this.pos.x, zeroCord.y + height/15 * this.pos.y, width/10, height/15)
	}

	this.MoveDown = function() {
		if (scene[this.pos.x][this.pos.y+1] == null) {
			scene[this.pos.x][this.pos.y] = null
			if (this.pos.y < 14) {this.pos.y++}
			scene[this.pos.x][this.pos.y] = this
		}
	}
}
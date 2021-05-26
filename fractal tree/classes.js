const Vector2 = function(x, y) {
    this.x = x
    this.y = y

    this.normalize = function() {
        var z = Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
        this.x /= z
        this.y /= z
        return this
    }

    this.length = function() {
        return Math.sqrt(Math.pow(this.x, 2) + Math.pow(this.y, 2))
    }
}

const Branch = function (x, y, x2, y2) {
    this.pos = new Vector2(x, y)
    this.end = new Vector2(x2, y2)
    this.endif = 0

    this.draw = function() {
        ctx.moveTo(x, y)
        ctx.lineTo(x2, y2)
    }

    this.length = function() {
        var z = new Vector2(this.pos.x - this.end.x, this.pos.y - this.end.y)
        return z.length()
    }

    this.update = function() {
        if (this.endif == 0) {
            var vect = new Vector2(this.pos.x - this.end.x, this.pos.y - this.end.y)
            var l = vect.length()
            var v = new Vector2(Math.cos(angle * (Math.PI/180)) - vect.normalize().x, -Math.sin(angle * (Math.PI/180)) - vect.normalize().y).normalize()
            branches[branches.length] = new Branch(this.end.x, this.end.y, this.end.x + v.x * (l/2), this.end.y + v.y * (l/2))
        } else if (this.endif == 1) {
            var vect = new Vector2(this.pos.x - this.end.x, this.pos.y - this.end.y)
            var l = vect.length()
            var v = new Vector2(Math.cos((180 - angle) * (Math.PI/180)) - vect.normalize().x, -Math.sin((180 - angle) * (Math.PI/180)) - vect.normalize().y).normalize()
            branches[branches.length] = new Branch(this.end.x, this.end.y, this.end.x + v.x * (l/2), this.end.y + v.y * (l/2))
        }
        this.endif++
    }
}
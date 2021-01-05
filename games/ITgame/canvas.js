window.onmousemove = function() {
	mousex = Math.floor(event.clientX/s)
	mousey = Math.floor(event.clientY/s)
}

window.onmousedown = function() {
	mousewhich = event.which
	/*if (mousewhich == 2) {
		new Pixel(mousex, mousey, true)
	}*/
	ctrl = event.ctrlKey
	alt = event.altKey
	mousedown = true;
}

window.onmouseup = function() {
	lastx = 0;
	lasty = 0
	mousedown = false
}

window.onkeypress = function(event) {
	if (event.key == "1") {mode = 1}
	if (event.key == "2") {mode = 2}
	if (event.key == "3") {mode = 3}
}

document.getElementById("s").max = Math.min(ctx.canvas.width, ctx.canvas.height)

pixels = []
stoped = false
mousedown = false;
mousewhich = 0;
lastx = 0;
lasty = 0;
mousex = 0
mousey = 0
mode = 1

ctx.fillStyle = "#FF0000"

function loop() {
	s = document.getElementById("s").value

	if (mousedown && (lastx != mousex || lasty != mousey)) {
		if (pixels[mousex] != undefined && pixels[mousex][mousey] != undefined) {
			if (ctrl) {
				pixels[mousex][mousey].Fon = true
			} else {
				pixels[mousex][mousey] = undefined
			}
		} else {
			new Pixel(mousex, mousey, ctrl, alt, mode == 2, mode == 3)
		}
		lastx = mousex
		lasty = mousey
	}

	if (stoped) {return}

	ctx.fillStyle = "#FFFFFF"
	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)

	for (var x = 0; x < pixels.length; x++) {
		if (pixels[x] != undefined) {
			for (var y = 0; y < pixels[x].length; y++) {
				if (pixels[x][y] != undefined) {
					if (!pixels[x][y].block) {pixels[x][y].update()}
					pixels[x][y].draw()
				}
			}
		}
	}
}
//function nextstep() {
//	ctx.fillStyle = "#FFFFFF"
//	ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height)
//
//	for (var x = 0; x < pixels.length; x++) {
//		if (pixels[x] != undefined) {
//			for (var y = 0; y < pixels[x].length; y++) {
//				if (pixels[x][y] != undefined) {
//					pixels[x][y].update()
//					pixels[x][y].draw()
//				}
//			}
//		}
//	}
//}
setInterval(loop, 100)
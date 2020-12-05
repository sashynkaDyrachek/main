var moveX = true
		zones = [[], [], []]
		function zone(tis) {
			if (moveX) {tis.firstChild.src = "X.png"}
			else {tis.firstChild.src = "O.png"}
			if (moveX) {
				switch (tis.id) {
					case "zone00":
						if (zones[0][1] == "X" && zones[0][2] == "X") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
						} else if (zones[1][0] == "X" && zones[2][0] == "X") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						} else if (zones[1][1] == "X" && zones[2][2] == "X") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						}
						zones[0][0] = "X"
						break
					case "zone01":
						if (zones[0][0] == "X" && zones[0][2] == "X") { 
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
						} else if (zones[1][1] == "X" && zones[2][1] == "X") {
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
						}
						zones[0][1] = "X"
						break
					case "zone02":
						if (zones[0][0] == "X" && zones[0][1] == "X") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
						} else if (zones[1][2] == "X" && zones[2][2] == "X") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[1][1] == "X" && zones[2][0] == "X") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						}
						zones[0][2] = "X"
						break
					case "zone10":
						if (zones[1][1] == "X" && zones[1][2] == "X") {
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
						} else if (zones[0][0] == "X" && zones[2][0] == "X") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						}
						zones[1][0] = "X"
						break
					case "zone11":
						if (zones[1][0] == "X" && zones[1][2] == "X") { 
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
						} else if (zones[0][1] == "X" && zones[2][1] == "X") {
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
						} else if (zones[0][0] == "X" && zones[2][2] == "X") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[0][2] == "X" && zones[2][0] == "X") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						}
						zones[1][1] = "X"
						break
					case "zone12":
						if (zones[1][0] == "X" && zones[1][1] == "X") {
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
						} else if (zones[0][2] == "X" && zones[2][2] == "X") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						}
						zones[1][2] = "X"
						break
					case "zone20":
						if (zones[2][1] == "X" && zones[2][2] == "X") {
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[0][0] == "X" && zones[1][0] == "X") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						} else if (zones[1][1] == "X" && zones[0][2] == "X") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						}
						zones[2][0] = "X"
						break
					case "zone21":
						if (zones[2][0] == "X" && zones[2][2] == "X") { 
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[0][1] == "X" && zones[1][1] == "X") {
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
						}
						zones[2][1] = "X"
						break
					case "zone22":
						if (zones[2][0] == "X" && zones[2][1] == "X") {
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[0][2] == "X" && zones[1][2] == "X") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[0][0] == "X" && zones[1][1] == "X") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						}
						zones[2][2] = "X"
						break
				}
			} else {switch (tis.id) {
					case "zone00":
						if (zones[0][1] == "O" && zones[0][2] == "O") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
						} else if (zones[1][0] == "O" && zones[2][0] == "O") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						} else if (zones[1][1] == "O" && zones[2][2] == "O") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						}
						zones[0][0] = "O"
						break
					case "zone01":
						if (zones[0][0] == "O" && zones[0][2] == "O") { 
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
						} else if (zones[1][1] == "O" && zones[2][1] == "O") {
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
						}
						zones[0][1] = "O"
						break
					case "zone02":
						if (zones[0][0] == "O" && zones[0][1] == "O") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
						} else if (zones[1][2] == "O" && zones[2][2] == "O") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[1][1] == "O" && zones[2][0] == "O") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						}
						zones[0][2] = "O"
						break
					case "zone10":
						if (zones[1][1] == "O" && zones[1][2] == "O") {
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
						} else if (zones[0][0] == "O" && zones[2][0] == "O") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						}
						zones[1][0] = "O"
						break
					case "zone11":
						if (zones[1][0] == "O" && zones[1][2] == "O") { 
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
						} else if (zones[0][1] == "O" && zones[2][1] == "O") {
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
						} else if (zones[0][0] == "O" && zones[2][2] == "O") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[0][2] == "O" && zones[2][0] == "O") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						}
						zones[1][1] = "O"
						break
					case "zone12":
						if (zones[1][0] == "O" && zones[1][1] == "O") {
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
						} else if (zones[0][2] == "O" && zones[2][2] == "O") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						}
						zones[1][2] = "O"
						break
					case "zone20":
						if (zones[2][1] == "O" && zones[2][2] == "O") {
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[0][0] == "O" && zones[1][0] == "O") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone10').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						} else if (zones[1][1] == "O" && zones[0][2] == "O") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
						}
						zones[2][0] = "O"
						break
					case "zone21":
						if (zones[2][0] == "O" && zones[2][2] == "O") { 
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[0][1] == "O" && zones[1][1] == "O") {
							document.getElementById('zone01').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
						}
						zones[2][1] = "O"
						break
					case "zone22":
						if (zones[2][0] == "O" && zones[2][1] == "O") {
							document.getElementById('zone20').firstChild.style.background = "#00FF00"
							document.getElementById('zone21').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[0][2] == "O" && zones[1][2] == "O") {
							document.getElementById('zone02').firstChild.style.background = "#00FF00"
							document.getElementById('zone12').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						} else if (zones[0][0] == "O" && zones[1][1] == "O") {
							document.getElementById('zone00').firstChild.style.background = "#00FF00"
							document.getElementById('zone11').firstChild.style.background = "#00FF00"
							document.getElementById('zone22').firstChild.style.background = "#00FF00"
						}
						zones[2][2] = "O"
						break
				}
			}
			moveX = !moveX
		}
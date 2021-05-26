function update() {
	Input = document.getElementById('inputValue').value
	if (Input == undefined) {Input = 0}

	Input1 = +document.getElementById('input1').value
	if (Input1 == undefined) {Input1 = 0}
}
function up_date() {
	Input = document.getElementById('inputValue1').value
	if (Input == undefined) {Input = 0}

	Input1 = +document.getElementById('input2').value
	if (Input1 == undefined) {Input1 = 0}
}
function output(text) {	document.getElementById('output').innerHTML = text }
function output1(text) { document.getElementById('output1').innerHTML = text }

document.getElementById('button').onclick = function() {
	update()
	Input = +Input
	if (Input == 0) {output(0)}
	res = ""
	while (Input>1) {
		res = rdb[Input%Input1] + res
		Input = Math.floor(Input/Input1)
	}
	if (Input == 0 && res != "") {Input = ""}
	res = Input+res
	output(res)

	up_date()

	res = 0
	for (i=0; i<Input.length; i++) {
		res = +db[Input[i]] + res
		res *= Input1
	}
	output1(res/Input1)
}
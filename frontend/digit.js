function initDial(){
	var offset = 0.26;
	var canvas = document.getElementById("digitDial");
	var w = canvas.width;
	var h = canvas.height;
	var context = canvas.getContext("2d");
	context.font = "24px Arial";
	redraw = () => {
		context.clearRect(0, 0, w, h);
		context.lineWidth = 1;
		var x, y, angle;
		for(var i = 0; i < 10; i++) {
			angle = offset + (Math.PI - 2 * offset) * i / 9;
			var textMetrics = context.measureText(i.toString());
			x = w / 2 + 0.85 * w / 2 * Math.cos(angle) - textMetrics.width / 2;
			y = h - 0.85 * h * Math.sin(angle) + parseInt(context.font) / 2;
			if(i == Math.floor(digitFloatValue)) {
				context.strokeStyle = "#0000CC";
			} else {
				context.strokeStyle = "#000000";
			}
			context.strokeText(i.toString(), x, y);
		}
		context.strokeStyle = "#FF0000";
		context.lineWidth = 10;
		context.beginPath();
		context.moveTo(w / 2, h);
		angle = offset + (Math.PI - 2 * offset) * digitFloatValue / 10
		x = w / 2 + 0.6 * w / 2 * Math.cos(angle);
		y = h - 0.6 * h * Math.sin(angle);
		context.lineTo(x, y);
		context.stroke();
	}
	setInterval(redraw, 100);
}

function selectDigit(){
	let digits = [];
	for(var i = 0; i < 10; i++){
		digits[i] = 0;
	}
	shiftReg.forEach(d => digits[d]++);
	imax = 0;
	for(var i = 1; i < 10; i++)
		if(digits[i] > digits[imax])
			imax = i;
	// num = num  * 10 + imax;
	if(document.getElementById("answer-text").innerHTML == "0")
		document.getElementById("answer-text").innerHTML = imax.toString();
	else
		document.getElementById("answer-text").innerHTML += imax.toString();
	checkAnswer();
	shiftReg = [];
}
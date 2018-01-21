var mood_pos = 0;
var mood_neut = 100;
var mood_neg = 0;

function updateMoodBars(data){
	console.log(data);
	if(data.length == 0)
		return;
	face = data[0];
	for(var i = 1; i < data.length; i++) {
		if(data[i].faceRectangle.width * data[i].faceRectangle.height > face.faceRectangle.width * face.faceRectangle.height)
			face = data[i];
	}

	mood_pos = Math.round(limit(0, 1, face.scores.happiness).toFixed(2) * 100);
	mood_neut = Math.round(limit(0, 1, face.scores.neutral + face.scores.surprise).toFixed(2) * 100);
	mood_neg = Math.round(limit(0, 1, face.scores.anger + face.scores.contempt + face.scores.disgust + face.scores.fear + face.scores.sadness).toFixed(2) * 100);

	var happy_bar = $("#happy-bar");
	happy_bar.css({width: mood_pos + "%", transition: "width " + Math.floor(SCREENSHOT_DELAY_MS/1000) + "s"});
	happy_bar.html(mood_pos + "%");
	var neutral_bar = $("#neutral-bar");
	neutral_bar.css({width: mood_neut + "%", transition: "width " + Math.floor(SCREENSHOT_DELAY_MS/1000) + "s"});
	neutral_bar.html(mood_neut + "%");
	var sad_bar = $("#sad-bar");
	sad_bar.css({width: mood_neg + "%", transition: "width " + Math.floor(SCREENSHOT_DELAY_MS/1000) + "s"});
	sad_bar.html(mood_neg + "%");
}

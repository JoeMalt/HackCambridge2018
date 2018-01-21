function endGame(){
	///alert("Time's up! You scored " + getScore());
    var finalScore = getScore();
    
    $("#content").load("end_game_content.html", "", () => {
        sendEmotionRequests = false;
        $('#score-para').append(finalScore);
    })
}

var currentPuzzle;

function newPuzzle() {
	currentPuzzle = genMathsPuzzle()
	document.getElementById("question-text").innerHTML = "<h2>" + currentPuzzle + " = ?" + "</h2>";
	document.getElementById("answer-text").innerHTML = "0";
	initialiseProgressBar(10, endGame);
}

function checkAnswer() {
	if (checkMathsSolution(currentPuzzle, document.getElementById("answer-text").innerHTML)){
		incrementScore();
		newPuzzle();
		//TODO correct feedback, reset timer
	} else {
		console.log("Not yet correct, expect ", eval(currentPuzzle), ", got ", document.getElementById("answer-text").innerHTML);
	}
}

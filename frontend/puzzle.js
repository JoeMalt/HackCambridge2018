function endGame(){
	alert("You are dead");
}

var currentPuzzle;

function newPuzzle() {
	currentPuzzle = genMathsPuzzle()
	document.getElementById("question-text").innerHTML = "<h2>" + currentPuzzle + " = ?" + "</h2>";
	document.getElementById("answer-text").innerHTML = "0";
	initialiseProgressBar(20, endGame);
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

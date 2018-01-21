function endGame(){
	alert("You are dead");
}

var currentPuzzle;

function newPuzzle() {
	currentPuzzle = genMathsPuzzle()
	document.getElementById("question-text").innerHTML = "<h2>" + currentPuzzle + " = ?" + "</h2>";
	initialiseProgressBar(20, endGame);
}

function submitAnswer() {
	if (checkMathsSolution(currentPuzzle, document.getElementById("answer-text").value)){
		incrementScore();
		newPuzzle();
		//TODO correct feedback, reset timer
	} else {
		//TODO incorrect feedback, penalise?
	}
}

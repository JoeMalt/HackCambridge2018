var OPERATIONS = [
	{label: " + ",
	 min: 1000,
	 max: 10000,
	 order: false
	},
	{
	 label: " - ",
	 min: 1000,
	 max: 10000,
	 order: true
	},
	{
	 label: " * ",
	 min: 100,
	 max: 1000,
	 order: false
	}
];

function genMathsPuzzle() {
	var opIndex = -1
	do
	{
		opIndex = Math.floor(Math.random() * OPERATIONS.length)
	} while (opIndex < 0 || opIndex >= OPERATIONS.length) //call me paranoid
		
	var firstOperand = Math.floor(Math.random() * (OPERATIONS[opIndex].max - OPERATIONS[opIndex].min) + OPERATIONS[opIndex].min);
	var secondOperand = Math.floor(Math.random() * (OPERATIONS[opIndex].max - OPERATIONS[opIndex].min) + OPERATIONS[opIndex].min);
	if (OPERATIONS[opIndex].order && firstOperand < secondOperand)
	{
		var temp = firstOperand;
		firstOperand = secondOperand;
		secondOperand = temp;
	}
	
	return( firstOperand.toString() + OPERATIONS[opIndex].label + secondOperand.toString());	
}

function checkMathsSolution(puzzle, solution){
	return solution == eval(puzzle)
}
var OPERATIONS = [
	{label: " + ",
	 min: 12,
	 max: 100,
	 order: false
	},
	{
	 label: " - ",
	 min: 12,
	 max: 100,
	 order: true
	},
	{
	 label: " * ",
	 min: 2,
	 max: 20,
	 order: false
	}
];

function genMathsPuzzle() {
	var opIndex = -1
	do
	{
		opIndex = Math.floor(Math.random() * OPERATIONS.length)
	} while (opIndex < 0 || opIndex >= OPERATIONS.length) //call me paranoid
		
	do {
		var firstOperand = Math.floor(Math.random() * (OPERATIONS[opIndex].max - OPERATIONS[opIndex].min) + OPERATIONS[opIndex].min);
		var secondOperand = Math.floor(Math.random() * (OPERATIONS[opIndex].max - OPERATIONS[opIndex].min) + OPERATIONS[opIndex].min);
	} while(firstOperand == secondOperand)

	if (OPERATIONS[opIndex].order && firstOperand < secondOperand)
	{
		var temp = firstOperand;
		firstOperand = secondOperand;
		secondOperand = temp;
	}
	
	return( firstOperand.toString() + OPERATIONS[opIndex].label + secondOperand.toString());	
}

function drawSlidingPuzzle(permutation, gap, width, canvas, src_image){
	var context = canvas.getContext('2d');
	var pieceWidth = src_image.width / width;
	var pieceHeight = src_image.height / width;
	for (var i = 0; i < width * width; ++i)
	{
		if (permutation[i] != 0)
		{
			context.drawImage(src_image, (permutation[i] % width) * pieceWidth, Math.floor(permutation[i] / width) * pieceHeight, pieceWidth, pieceHeight, (i % width) * pieceWidth, Math.floor(i / width) * pieceHeight, pieceWidth, pieceHeight);
		}
	}
}

function updateSlidingPuzzle(permutation, gap, width, direction){ //returns gap, because
	//1 = up, 2 = right, 3 = down, 4 = left
	if (direction == 1 && gap >= width){
		permutation[gap] = permutation[gap-width];
		permutation[gap - width] = 0 ;
		gap -= width;
	}
	if (direction == 2 && (gap % width < width - 1)){
		permutation[gap] = permutation[gap + 1];
		permutation[gap + 1] = 0;
		gap += 1;
	}
	if (direction == 3 && gap < (width - 1) * width){
		permutation[gap] = permutation[gap+width];
		permutation[gap + width] = 0;
		gap += width;
	}
	if (direction == 4 && gap % width > 0){
		permutation[gap] = permutation[gap-1];
		permutation[gap - 1] = 0 ;
		gap -= 1;
	}
	return gap;
}

var SHUFFLES = 100;

function checkSlidingPuzzle(permutation, gap, width){
	for (var i = 0; i < width * width; ++i)
	{
		if (permutation[i] != i)
		{
			return false;
		}
	}
	return true;
}

function genSlidingPuzzle(width) {
	var permutation = [];
	var gap_pos = 0;
	for (var i = 0; i < width * width; ++i){
		permutation[i] = i;
	}
	for (var i = 0; i < SHUFFLES || checkSlidingPuzzle(permutation, gap_pos, width); ++i){
		direction = Math.floor(Math.random() * 4) + 1;
		gap_pos = updateSlidingPuzzle(permutation, gap_pos, width, direction);
	}
	return [permutation, gap_pos];
}

function checkMathsSolution(puzzle, solution){
	return solution == eval(puzzle)
}

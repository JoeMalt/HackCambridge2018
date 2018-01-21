function setScore(score){
    $('#score-display').text(score);
}

function getScore(){
    return parseInt($('#score-display').text());
}

function incrementScore(){
    $('#score-display').text(parseInt($('#score-display').text()) + 1);
}

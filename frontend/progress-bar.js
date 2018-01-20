const RED_THRESHOLD = 20;
const YELLOW_THRESHOLD = 50;

var seconds_remaining;
var total_seconds;

var out_of_time_callback;

var countdown_interval;

function initialiseProgressBar(seconds, out_of_time_callback){
    console.log("initialising progress bar");
    seconds_remaining = seconds;
    total_seconds = seconds;
    out_of_time_callback = out_of_time_callback;
    updateProgressBar();
}

// call this once per second
function decrementSeconds(){ //todo min zero
    console.log("Decrementing seconds");
    seconds_remaining--;
    if (seconds_remaining <= 0){
        out_of_time_callback();
    }
}

function updateProgressBar(){
    var percentage = ((seconds_remaining / total_seconds) * 100).toFixed(2);
    console.log("Updating progress bar to " + percentage + "%");
    $('#timer-progress-bar').css({ width : percentage + "%"}); 
    
    if (percentage > YELLOW_THRESHOLD){
        console.log("Setting progress bar to green");
        $('#timer-progress-bar').addClass('bg-success');
        $('#timer-progress-bar').removeClass('bg-warning');
        $('#timer-progress-bar').removeClass('bg-error');
    }
    else if (percentage > RED_THRESHOLD){
        console.log("Setting progress bar to yellow");
        $('#timer-progress-bar').removeClass('bg-success');
        $('#timer-progress-bar').addClass('bg-warning');
        $('#timer-progress-bar').removeClass('bg-error');
    }
    else{
        console.log("Setting progress bar to red");
        $('#timer-progress-bar').removeClass('bg-success');
        $('#timer-progress-bar').removeClass('bg-warning');
        $('#timer-progress-bar').addClass('bg-danger');
    }
}

function startTimer(){    
    countdown_interval = setInterval(decrementSeconds, 1000);
}
function pauseTimer(){
    window.clearInterval(countdown_interval);
}

setInterval(updateProgressBar, 1000);

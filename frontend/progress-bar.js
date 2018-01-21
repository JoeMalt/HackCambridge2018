const RED_THRESHOLD = 20;
const YELLOW_THRESHOLD = 50;

var total_seconds;

var finishedBarCallback;

var updateInterval;

var barInitTime;

function initialiseProgressBar(seconds, out_of_time_callback){
    total_seconds = seconds;
    barInitTime = Date.now();
    finishedBarCallback = out_of_time_callback;
    updateProgressBar();
    updateInterval = setInterval(updateProgressBar, 100);
}

function updateProgressBar(){

    var percentage = (100 - 100 * ((Date.now() - barInitTime) / (1000 * total_seconds))).toFixed(2);
    var stopFlag = false;;

    if(stopFlag = (percentage <= 0.0)){
        clearInterval(updateInterval);
        percentage = 0
    }
    // console.log("Updating progress bar to " + percentage + "%");
    $('#timer-progress-bar').css({ width : percentage + "%"}); 
    
    if (percentage > YELLOW_THRESHOLD){
        // console.log("Setting progress bar to green");
        $('#timer-progress-bar').addClass('bg-success');
        $('#timer-progress-bar').removeClass('bg-warning');
        $('#timer-progress-bar').removeClass('bg-error');
    }
    else if (percentage > RED_THRESHOLD){
        // console.log("Setting progress bar to yellow");
        $('#timer-progress-bar').removeClass('bg-success');
        $('#timer-progress-bar').addClass('bg-warning');
        $('#timer-progress-bar').removeClass('bg-error');
    }
    else{
        // console.log("Setting progress bar to red");
        $('#timer-progress-bar').removeClass('bg-success');
        $('#timer-progress-bar').removeClass('bg-warning');
        $('#timer-progress-bar').addClass('bg-danger');
    }

    if(stopFlag){
        finishedBarCallback();
    }
}

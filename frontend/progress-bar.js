const RED_THRESHOLD = 20;
const YELLOW_THRESHOLD = 50;

var total_seconds;

var updateInterval;
var barInitTime;
var out_of_time_callback;

function initialiseProgressBar(seconds, out_of_time_callback_fn){
    total_seconds = seconds;
    barInitTime = Date.now();
    out_of_time_callback = out_of_time_callback_fn;
    updateProgressBar();
    updateInterval = setInterval(updateProgressBar, 100);
}

function updateProgressBar(){
    var percentage = (100 - 100 * ((Date.now() - barInitTime) / (1000 * total_seconds))).toFixed(2);
    
    if (percentage < 0.0){
        console.log("out of time");
        out_of_time_callback();
        window.clearInterval(updateInterval);
    }

    ///console.log("Updating progress bar to " + percentage + "%");
    $('#timer-progress-bar').css({ width : percentage + "%"}); 
    
    if (percentage > YELLOW_THRESHOLD){
        ///console.log("Setting progress bar to green");
        $('#timer-progress-bar').addClass('bg-success');
        $('#timer-progress-bar').removeClass('bg-warning');
        $('#timer-progress-bar').removeClass('bg-error');
    }
    else if (percentage > RED_THRESHOLD){
        ///console.log("Setting progress bar to yellow");
        $('#timer-progress-bar').removeClass('bg-success');
        $('#timer-progress-bar').addClass('bg-warning');
        $('#timer-progress-bar').removeClass('bg-error');
    }
    else{
        ///console.log("Setting progress bar to red");
        $('#timer-progress-bar').removeClass('bg-success');
        $('#timer-progress-bar').removeClass('bg-warning');
        $('#timer-progress-bar').addClass('bg-danger');
    }
}

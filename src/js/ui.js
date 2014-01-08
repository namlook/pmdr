var pmdr = new Pomodoro();

var startButton = $('#startTimer');
var timerView = $('#timerView');

// Display remaining seconds in timer
var updateTimerView = function(pmdr, timerView) {
    var seconds = pmdr.getRemainingSeconds();
    timerView.html(seconds);
}

startButton.on('click', function(){
    var interval;

    pmdr.start(3, function(){
        clearInterval(interval);
        alert('done!');
    });

    // Update timer every seconds
    interval = setInterval(function() {
        updateTimerView(pmdr, timerView);
    }, 1000);
    updateTimerView(pmdr, timerView);
});


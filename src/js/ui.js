
var startButton = $('#startTimer');
var timerView = $('#timerView');


var pmdr = new Pomodoro();

pmdr.onChange(function(remainingSeconds){
    timerView.html(remainingSeconds);
});


pmdr.onChange(function(remainingSeconds){
    $('title').text(remainingSeconds);
});

pmdr.onFinish(function(){
    alert('done');
});


startButton.on('click', function(){
    pmdr.start(3);
});


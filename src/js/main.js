var Pmdr = Pmdr || {};

Pmdr.App = (function(Models, Views) {
    var run = function() {
        var timer = new Models.Timer();
        var countdownView = new Views.CountdownView({
            model: timer
        });
        var ctrlView = new Views.CtrlView({
            model: timer
        });

        var pomodoros = new Models.Pomodoros();
        var pomodorosView = new Views.PomodorosView({collection: pomodoros});

        timer.onFinish(function(){
            // TODO check timer type before saving pomodoro
            pomodoros.add({createdAt: new Date()});
            alert('done');
        });
    }

    return {
        'run': run
    }
})(Pmdr.Models, Pmdr.Views);
Pmdr.App.run();

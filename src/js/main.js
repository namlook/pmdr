var Pmdr = Pmdr || {};


Pmdr.App = (function(Models, Views, utils) {
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
            if (this.get('type') === 'pomodoro') {
                pomodoros.add({createdAt: new Date()});
                utils.notify('Pomodoro finished !', {body: 'time for a break'});
            }
            else {
                utils.notify("Break's over", {body: 'get back to work !'});
            }
        });
    };

    return {
        'run': run
    };
})(Pmdr.Models, Pmdr.Views, Pmdr.utils);
Pmdr.App.run();

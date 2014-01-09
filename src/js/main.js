var Pmdr = Pmdr || {};


Pmdr.App = (function(Models, Views, utils) {
    var createTimer = function() {
        var timer = new Models.Timer();

        var timerId = localStorage.getItem('timer');
        if (timerId) {
            timer.fetch(timerId);
        }

        return timer;
    }

    var run = function() {
        var pomodoros = new Models.Pomodoros();
        var pomodorosView = new Views.PomodorosView({collection: pomodoros});
        pomodoros.fetch();

        var timer = createTimer();
        console.log(timer.get('startedAt'));
        console.log(timer.id);
        console.log(timer.get('duration'));

        var countdownView = new Views.CountdownView({
            model: timer
        });
        var ctrlView = new Views.CtrlView({
            model: timer
        });

        timer.onFinish(function(){
            if (this.get('type') === 'pomodoro') {
                pomodoros.create({createdAt: new Date()});
                utils.notify('Pomodoro finished !', {body: 'time for a break'});
            }
            else {
                utils.notify("Break's over", {body: 'get back to work !'});
            }

            var audioElt = document.getElementById('audioAlert');
            audioElt.play();
        });
    };

    return {
        'run': run
    };
})(Pmdr.Models, Pmdr.Views, Pmdr.utils);
Pmdr.App.run();

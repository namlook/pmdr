var Pmdr = Pmdr || {};


Pmdr.App = (function(Models, Views, utils) {
    var createTimer = function() {
        var data;
        try {
            data = JSON.parse(localStorage.getItem('timer'));
        } catch(SyntaxError) {
            data = null;
            localStorage.removeItem('timer');
        }

        var timer = new Models.Timer(data);
        var startedAt = timer.get('startedAt');
        if (timer.get('isStarted')) {
            var delta = (Date.now() - startedAt) / 1000;
            if (delta > 0) {
                var newDuration = parseInt(timer.get('duration') - delta, 10);
                timer.start({duration: newDuration});
            }
        }
        return timer;
    };

    var run = function() {
        var pomodoros = new Models.Pomodoros();
        var pomodorosView = new Views.PomodorosView({collection: pomodoros});
        pomodoros.fetch();

        var timer = createTimer();

        var countdownView = new Views.CountdownView({
            model: timer
        });
        var ctrlView = new Views.CtrlView({
            model: timer
        });
        var dynamicTitleView = new Views.DynamicTitleView({
            model: timer
        });

        timer.onStart(function() {
            localStorage.setItem('timer', JSON.stringify(timer.toJSON()));
        });

        timer.onStop(function() {
            localStorage.removeItem('timer');
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

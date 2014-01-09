var Pmdr = Pmdr || {};


Pmdr.App = (function(Models, Views, utils) {
    var run = function() {
        var pomodoros = new Models.Pomodoros();
        var pomodorosView = new Views.PomodorosView({collection: pomodoros});
        pomodoros.fetch();

        var timer = new Models.Timer();
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

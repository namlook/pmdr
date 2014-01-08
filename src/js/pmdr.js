var Pomodoro = function() {
    this.timer = null;
    this.isStarted = false;
    this.startedAt = null;
    this.duration = 25 * 60;
};

Pomodoro.prototype.start = function(duration) {
    console.log('Starting pomodoro');

    if (duration) {
        this.duration = duration;
    }
    this.isStarted = true;
    this.remainingSeconds = this.duration;
    this.startedAt = Date.now();
};

Pomodoro.prototype.stop = function() {
    console.log('Stopping pomodoro');

    this.isStarted = false;
    this.remainingSeconds = null;
    this.startedAt = null;
};

// returns the number of remaining seconds till the end of the pomodoro
Pomodoro.prototype.getRemainingSeconds = function() {
    if (! this.isStarted) {
        return null;
    }
    var now = Date.now();
    var elapsedSeconds = parseInt((now - this.startedAt) / 1000);
    return this.duration - elapsedSeconds;
};

module.exports = Pomodoro;

var Pomodoro = function() {
    this.timer = null;
    this.isStarted = false;
    this.remainingSeconds = null;
    this.duration = 25 * 60;
};

Pomodoro.prototype.start = function(duration) {
    if (duration) {
        this.duration = duration;
    }
    this.isStarted = true;
    this.remainingSeconds = duration;
};

Pomodoro.prototype.stop = function() {
    this.isStarted = false;
    this.remainingSeconds = null;
};

// returns the number of remaining seconds till the end of the pomodoro
Pomodoro.prototype.getRemainingSeconds = function() {
    return this.remainingSeconds;
};

module.exports = Pomodoro;

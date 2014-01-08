
var Pomodoro = function() {
    this.timer = null;
    this.isStarted = false;
    this.startedAt = null;
    this.duration = 25 * 60;
};

Pomodoro.prototype.start = function(duration, callback) {
    if (!callback) {
        if (typeof(duration) === 'function'){
            callback = duration;
            duration = undefined;
        }
        else {
            callback = function(){};
        }
    }
    if (duration) {
        this.duration = duration;
    }
    this.isStarted = true;
    this.remainingSeconds = this.duration;
    this.startedAt = Date.now();
    var that = this;
    this.timer = setTimeout(function(){
        callback();
        that.stop();
    }, this.duration * 1000);
};

Pomodoro.prototype.stop = function() {
    this.isStarted = false;
    this.remainingSeconds = null;
    this.startedAt = null;

    clearTimeout(this.timer);
    this.timer = null;
};

// returns the number of remaining seconds till the end of the pomodoro
Pomodoro.prototype.getRemainingSeconds = function() {
    if (! this.isStarted) {
        return null;
    }
    var now = Date.now();
    var elapsedSeconds = parseInt((now - this.startedAt) / 1000, 10);
    return this.duration - elapsedSeconds;
};

module.exports = Pomodoro;

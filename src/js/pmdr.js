var Pomodoro = function() {
    this.timer = null;
    this.isStarted = false;
    this.remainingSeconds = null;
};

Pomodoro.prototype.start = function() {
    this.isStarted = true;
    this.remainingSeconds = 25 * 60;
    clearTimeout(this.timer);
    this.timer = setTimeout(function () {
        alert("done!");
    }, 1000);
};

Pomodoro.prototype.stop = function() {
    this.isStarted = false;
    this.remainingSeconds = null;
    clearTimeout(this.timer);
};

// returns the number of remaining seconds till the end of the pomodoro
Pomodoro.prototype.getRemainingSeconds = function() {
	return this.remainingSeconds;
};

module.exports = Pomodoro;

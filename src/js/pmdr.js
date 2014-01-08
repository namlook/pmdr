var Pomodoro = function() {
    var timer;
    var isStarted = false;
}

Pomodoro.prototype.start = function() {
    this.isStarted = true;
    clearTimeout(this.timer);
    return timer = setTimeout(function () {
        alert("done!");
    }, 1000);
};

Pomodoro.prototype.stop = function() {
    this.isStarted = false;
    clearTimeout(this.timer);
};

Pomodoro.prototype.getRemaining = function() {}

module.exports = Pomodoro;

function Pomodoro() {
    var timer;

    return {
        start: function(callback) {
            clearTimeout(timer);
            // var args = [].slice.call(arguments);
            return timer = setTimeout(function () {
                // callback.apply(this, args);
                alert("done!");
            }, 1000);
        },
        stop: function() {
            clearTimeout(timer);
        },
        getRemaining: function(){

        }
    }
}

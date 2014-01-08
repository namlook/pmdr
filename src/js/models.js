
var Pomodoro = Backbone.Model.extend({

    defaults: {
        isStarted: false,
        duration: 25 * 60,
        remainingSeconds: null
    },

    initialize: function() {
        this.listenTo(this, 'finished', this.finish);
    },

    start: function(duration){
        if (duration) {
            this.set('duration', duration);
        }

        this.set('isStarted', true);
        this.set('remainingSeconds', this.get('duration'));
        this.trigger('countedDown', this.get('remainingSeconds'));

        var that = this;
        clearInterval(this._interval);
        this._interval = setInterval(function(){
            that.set('remainingSeconds', that.get('remainingSeconds') - 1);
            var remainingSeconds = that.get('remainingSeconds');
            that.trigger('countedDown', remainingSeconds);
            if (remainingSeconds <= 0){
                that.trigger('finished');
            }
        }, 1000);
    },

    finish: function() {
        clearInterval(this._interval);
        this.stop();
    },

    stop: function() {
        this.set('isStarted', false);
        this.set('remainingSeconds', null);
    },

    onChange: function(callback) {
        this.listenTo(this, 'countedDown', callback);
    },

    onFinish: function(callback) {
        this.listenTo(this, 'finished', callback);
    }

});

module.exports = Pomodoro;

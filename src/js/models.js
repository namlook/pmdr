
var Pomodoro = Backbone.Model.extend({
    defaults: {
        createdAt: null
    }
});


var Pomodoros = Backbone.Collection.extend({
    model: Pomodoro
});


var Timer = Backbone.Model.extend({

    defaults: {
        isStarted: false,
        duration: 25 * 60,
        remainingSeconds: null
    },

    initialize: function() {
        this.listenTo(this, 'finished', this.stop);
        this.pomodoros = new Pomodoros();
        var that = this;
        this.onFinish(function() {
            that.pomodoros.add({createdAt: new Date()});
        });
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

    stop: function() {
        this.set('remainingSeconds', null);
        this.set('isStarted', false);
        clearInterval(this._interval);
    },

    onChange: function(callback) {
        this.listenTo(this, 'countedDown', callback);
    },

    onFinish: function(callback) {
        this.listenTo(this, 'finished', callback);
    }

});


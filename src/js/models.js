
var Timer = Backbone.Model.extend({

    defaults: {
        isStarted: false,
        duration: 25 * 60,
        remainingSeconds: null
    },

    initialize: function() {
        this.listenTo(this, 'finished', this.stop);
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
        this.set('isStarted', false);
        this.set('remainingSeconds', null);
        clearInterval(this._interval);
    },

    onChange: function(callback) {
        this.listenTo(this, 'countedDown', callback);
    },

    onFinish: function(callback) {
        this.listenTo(this, 'finished', callback);
    }

});

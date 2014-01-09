
var Pmdr = Pmdr || {};
Pmdr.Models = {};

Pmdr.Models.Pomodoro = Backbone.Model.extend({
    defaults: {
        createdAt: null
    }
});


Pmdr.Models.Pomodoros = Backbone.Collection.extend({

    localStorage: new Backbone.LocalStorage("pomodoros"),

    model: Pmdr.Models.Pomodoro

});


Pmdr.Models.Timer = Backbone.Model.extend({

    defaults: {
        isStarted: false,
        startedAt: null,
        duration: 25 * 60,
        remainingSeconds: null,
        type: null
    },

    initialize: function() {
        this.listenTo(this, 'finished', this.stop);
    },

    start: function(options){
        options = options || {};
        if (options.duration) {
            this.set('duration', options.duration);
        }
        this.set('type', options.type);

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

        this.set('startedAt', Date.now());
        this.trigger('started');
    },

    stop: function() {
        this.set('remainingSeconds', null);
        this.set('isStarted', false);
        this.set('startedAt', null);
        clearInterval(this._interval);
        this.trigger('stopped');
    },

    onStart: function(callback) {
        this.listenTo(this, 'started', callback);
    },

    onChange: function(callback) {
        this.listenTo(this, 'countedDown', callback);
    },

    onStop: function(callback) {
        this.listenTo(this, 'stopped', callback);
    },

    onFinish: function(callback) {
        this.listenTo(this, 'finished', callback);
    }

});

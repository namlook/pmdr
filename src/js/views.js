
var CountdownView = Backbone.View.extend({
    el: '#countdown',
    initialize: function() {
        this.listenTo(this.model, 'countedDown', this.render);
    },

    render: function() {
        var value = this._prettifySeconds(this.model.get('remainingSeconds'));
        this.$el.html(value);
        return this;
    },

    _prettifySeconds: function(seconds) {
        var minutes = parseInt(seconds/60, 10);
        minutes = _.str.pad(minutes, 2, '0');
        seconds = _.str.pad(seconds % 60, 2, '0');
        return minutes+":"+seconds;
    }

});

var CtrlButtonView = Backbone.View.extend({
    el: '#ctrlButton',
    events: {
        'click': 'toggleTimer'
    },

    initialize: function() {
        this.listenTo(this.model, 'change:isStarted', this.render);
    },

    toggleTimer: function() {
        console.log(this.model.get('isStarted'));
        if(!this.model.get('isStarted')) {
            this.model.start();
        } else {
            this.model.stop();
        }
    },

    render: function() {
        console.log(this.model.get('isStarted'));
        if(!this.model.get('isStarted')) {
            this.$el.text('stop');
        } else {
            this.$el.text('start');
        }
    }
});

var timer = new Timer();
var countdownView = new CountdownView({
    model: timer
});
var ctrlButtonView = new CtrlButtonView({
    model: timer
});

timer.onFinish(function(){
    alert('done');
});

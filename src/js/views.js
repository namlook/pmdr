
var CountdownView = Backbone.View.extend({
    el: '#countdown',
    initialize: function() {
        this.listenTo(this.model, 'countedDown', this.render);
    },

    render: function() {
        var value = this._prettifySeconds(this.model.get('remainingSeconds'));
        this.$el.html(value);
    },

    _prettifySeconds: function(seconds) {
        var minutes = parseInt(seconds/60, 10);
        minutes = _.str.pad(minutes, 2, '0');
        seconds = _.str.pad(seconds % 60, 2, '0');
        return minutes+":"+seconds;
    }

});

var StartButtonView = Backbone.View.extend({
    el: '#startButton',
    events: {
        'click': 'startTimer'
    },
    startTimer: function() {
        this.model.start(3);
    }
});

var timer = new Timer();
var countdownView = new CountdownView({
    model: timer
})
var startButtonView = new StartButtonView({
    model: timer
})

timer.onFinish(function(){
    alert('done');
});


var CountdownView = Backbone.View.extend({
    el: '#countdown',
    initialize: function() {
        this.listenTo(this.model, 'countedDown', this.render);
    },
    render: function() {
        this.$el.html(this.model.get('remainingSeconds'));
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

var pmdr = new Pomodoro();
var countdownView = new CountdownView({
    model: pmdr
})
var startButtonView = new StartButtonView({
    model: pmdr
})

pmdr.onFinish(function(){
    alert('done');
});

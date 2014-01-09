
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

var StartButtonView = Backbone.View.extend({

    tagName: 'button',
    className: 'ctrlButton',

    events: {
        'click': 'start'
    },

    initialize: function(options) {
        this.title = options.title;
        this.duration = options.duration;
    },

    render: function() {
        this.$el.text(this.title);
        return this;
    },

    start: function() {
        this.model.start(this.duration);
    }
});

var CtrlView = Backbone.View.extend({
    el: '#ctrlView',

    initialize: function() {
        this.pomodoroButton = new StartButtonView({
            'model': this.model,
            'title': 'start',
            'duration': 25 * 60
        });

        this.shortBreakButton = new StartButtonView({
            'model': this.model,
            'title': 'break',
            'duration': 5 * 60
        });

        this.longBreakButton = new StartButtonView({
            'model': this.model,
            'title': 'long break',
            'duration': 15 * 60
        });

        this.listenTo(this.model, 'change:isStarted', this.updateButtons);

        this.render();
    },

    stopTimer: function() {
        this.model.stop();
    },

    updateButtons: function() {
        var started = this.model.get('isStarted');
        this.pomodoroButton.$el.prop('disabled', started);
        this.shortBreakButton.$el.prop('disabled', started);
        this.longBreakButton.$el.prop('disabled', started);
    },

    render: function() {
        this.$el.empty();
        this.$el.append(this.pomodoroButton.render().$el);
        this.$el.append(this.shortBreakButton.render().$el);
        this.$el.append(this.longBreakButton.render().$el);
    }
});

var timer = new Timer();
var countdownView = new CountdownView({
    model: timer
});
var ctrlView = new CtrlView({
    model: timer
});

timer.onFinish(function(){
    alert('done');
});

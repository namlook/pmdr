var expect = chai.expect;

describe('TimerView', function() {
    var clock;

    before(function () {
        clock = sinon.useFakeTimers();

        var countdown = $('<h1 id="countdown"></h1>');
        var button = $('<button id="startButton">start</button>');

        $('body').append(countdown);
        $('body').append(button);
    });

    after(function () {
        clock.restore();
    });

    describe('CountodwnView', function() {
        it('should display a countdown when start button clicked', function() {
            var timer = new Timer({'duration': 1500});
            var countdownView = new CountdownView({
                model: timer
            });
            var startButtonView = new StartButtonView({
                model: timer
            });

            startButtonView.$el.click();
            expect(countdownView.$el.text()).to.be.equal('25:00');
        });
    });
});

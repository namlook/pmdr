var expect = chai.expect;

describe('TimerView', function() {
    var clock;

    before(function () {
        clock = sinon.useFakeTimers();

        var countdown = $('<h1 id="countdown"></h1>');
        var button = $('<button id="startButton">start</button>');

        var testdiv = $('<div></div>');
        testdiv.append(countdown);
        testdiv.append(button);
        testdiv.hide();
        $('body').append(testdiv);
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
        it('should decrement the clock every seconds', function() {
            var timer = new Timer({'duration': 1500});
            var countdownView = new CountdownView({
                model: timer
            });
            var startButtonView = new StartButtonView({
                model: timer
            });

            startButtonView.$el.click();
            expect(countdownView.$el.text()).to.be.equal('25:00');

            clock.tick(1000);
            expect(countdownView.$el.text()).to.be.equal('24:59');
            clock.tick(1000);
            expect(countdownView.$el.text()).to.be.equal('24:58');
            clock.tick(1400000);
            expect(countdownView.$el.text()).to.be.equal('01:38');
        });
    });
});

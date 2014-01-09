var expect = chai.expect;

describe('TimerView', function() {
    var clock, timer, ctrlButtonView, countdownView;

    before(function () {
        clock = sinon.useFakeTimers();

        var countdown = $('<h1 id="countdown"></h1>');
        var button = $('<button id="ctrlButton">start</button>');

        var testdiv = $('<div></div>');
        testdiv.append(countdown);
        testdiv.append(button);
        testdiv.hide();
        $('body').append(testdiv);

        timer = new Timer({'duration': 1500});
        countdownView = new CountdownView({
            model: timer
        });
        ctrlButtonView = new CtrlButtonView({
            model: timer
        });

    });

    after(function () {
        clock.restore();
    });

    describe('Default CountodwnView', function() {
        it('should display a countdown when start button clicked', function() {
            ctrlButtonView.$el.click();
            expect(countdownView.$el.text()).to.be.equal('25:00');
        });
        it('should decrement the clock every seconds', function() {
            ctrlButtonView.$el.click();
            expect(countdownView.$el.text()).to.be.equal('25:00');

            clock.tick(1000);
            expect(countdownView.$el.text()).to.be.equal('24:59');
            clock.tick(1000);
            expect(countdownView.$el.text()).to.be.equal('24:58');
            clock.tick(1400000);
            expect(countdownView.$el.text()).to.be.equal('01:38');
        });
        it('should change the start button into a stop button', function() {
            ctrlButtonView.$el.click();
            expect(ctrlButtonView.$el.text()).to.be.equal('stop');
        });
        it('shoud reset the timer when the start butotn is clicked twice', function() {
            ctrlButtonView.$el.click();
            clock.tick(1000);
            expect(countdownView.$el.text()).to.be.equal('24:59');
            ctrlButtonView.$el.click();
            expect(countdownView.$el.text()).to.be.equal('25:00');
            expect(ctrlButtonView.$el.text()).to.be.equal('start');
        });
    });
});

// var chai = require('chai');
// chai.Assertion.includeStack = true;
// var expect = chai.expect;
// var sinon = require('sinon');

// var Timer = require('../src/js/models');


var expect = chai.expect;

describe('Timer', function() {

    var clock;

    before(function () {
        clock = sinon.useFakeTimers();
    });

    after(function () {
        clock.restore();
    });



    describe('start()', function() {
        it('should start a pomodoro', function() {
            var timer = new Timer();
            expect(timer.get('isStarted')).to.be.false;

            timer.start();
            expect(timer.get('isStarted')).to.be.true;
        });
        it('should take an optional number of seconds', function() {
            var timer = new Timer();
            timer.start(20);
            expect(timer.get('duration')).to.be.equal(20);
        });
        it('should have a default duration to 1500 (25 minutes)', function() {
            var timer = new Timer();
            timer.start();
            expect(timer.get('duration')).to.be.equal(1500);
        });
        it('should be stopped when the time is over', function() {
            var timer = new Timer();
            timer.start(1);
            clock.tick(1000);
            expect(timer.get('isStarted')).to.be.false;
        });
        it('should trigger the stop method when over', function() {
            var timer = new Timer();
            timer.start(1);

            expect(timer.get('isStarted')).to.be.true;
            clock.tick(500);

            clock.tick(600);
            expect(timer.get('isStarted')).to.be.false;
        });
        it('should clear the timer if stop is called manually', function() {
            var timer = new Timer();
            sinon.spy(timer, "stop");
            timer.start(2);

            clock.tick(1000);
            expect(timer.stop.calledOnce).to.be.false;

            timer.stop();
            expect(timer.stop.calledOnce).to.be.ok;

            clock.tick(2000);
            expect(timer.stop.calledOnce).to.be.ok;
        });
        it('should call the callback when the pomodoro is over', function(done) {
            var timer = new Timer();
            timer.start(1);
            timer.onFinish(function(){
                done();
            });
            clock.tick(1000);
        });
    });

    describe('stop()', function() {
        it('should stop a pomodoro', function() {
            var timer = new Timer();
            timer.start();
            expect(timer.get('isStarted')).to.be.true;

            timer.stop();
            expect(timer.get('isStarted')).to.be.false;
        });
    });

    describe('onChange', function(){
        it('should be triggered every each seconds', function(done) {
            var timer = new Timer();
            timer.start(3);
            var changedSpy = sinon.spy(function(){});
            timer.onChange(changedSpy);
            clock.tick(10000);
            expect(changedSpy.calledThrice).to.be.ok;
            done();
        });
        it('should pass the number of remaining seconds', function() {
            var timer = new Timer();
            timer.start(3);
            expect(timer.get('remainingSeconds')).to.be.equal(3);
            clock.tick(1000);
            expect(timer.get('remainingSeconds')).to.be.equal(2);
            clock.tick(1000);
            expect(timer.get('remainingSeconds')).to.be.equal(1);
            clock.tick(1000);
            expect(timer.get('remainingSeconds')).to.be.null;
        });
    });

    describe('remainingSeconds', function() {
        it('should return null if the pomodoro is not started', function() {
            var timer = new Timer();
            var remainingSeconds = timer.get('remainingSeconds');
            expect(remainingSeconds).to.be.null;
        });
        it('should return a positive number', function() {
            var timer = new Timer();
            timer.start(20);

            var remainingSeconds = timer.get('remainingSeconds');
            expect(remainingSeconds).to.be.at.least(0);
        });
        it('should decrease of 1 every seconds', function() {
            var timer = new Timer();
            timer.start(20);

            var remainingSeconds = timer.get('remainingSeconds');
            expect(remainingSeconds).to.be.equal(20);

            clock.tick(900);
            remainingSeconds = timer.get('remainingSeconds');
            expect(remainingSeconds).to.be.equal(20);

            clock.tick(101);
            remainingSeconds = timer.get('remainingSeconds');
            expect(remainingSeconds).to.be.equal(19);

            clock.tick(10000);
            remainingSeconds = timer.get('remainingSeconds');
            expect(remainingSeconds).to.be.equal(9);

        });
        it('should return null if the pomodoro is stopped', function() {
            var timer = new Timer();
            timer.start();
            timer.stop();
            var remainingSeconds = timer.get('remainingSeconds');
            expect(remainingSeconds).to.be.null;
        });
        it('should return null if the pomodoro is finished', function() {
            var timer = new Timer();
            timer.start(20);

            clock.tick(25000);
            remainingSeconds = timer.get('remainingSeconds');
            expect(remainingSeconds).to.be.null;
        });
    });
});

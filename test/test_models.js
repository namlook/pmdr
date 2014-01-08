var should = require('chai').should();
var expect = require('chai').expect;

var Pomodoro = require('../src/js/pmdr');


describe('Pomodoro', function() {
    describe('start()', function() {
        it('should start a pomodoro', function() {
            var pmdr = new Pomodoro();
            expect(pmdr.isStarted).to.be.false;

            pmdr.start();
            expect(pmdr.isStarted).to.be.true;
        });
        it('should take an optional number of seconds');
    });

    describe('stop()', function() {
        it('should stop a pomodoro', function() {
            var pmdr = new Pomodoro();
            pmdr.start();
            expect(pmdr.isStarted).to.be.true;

            pmdr.stop();
            expect(pmdr.isStarted).to.be.false;
        });
    });

    describe('getRemainingSeconds()', function() {
        it('should return null if the pomodoro is not started', function() {
            var pmdr = new Pomodoro();
            var remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.null;
        });
        it('should give the time remaining before the end of timer', function() {
            var pmdr = new Pomodoro();
            pmdr.start();
            var remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.at.least(0);
        });
        it('should return null if the pomodoro is stopped', function() {
            var pmdr = new Pomodoro();
            pmdr.start();
            pmdr.stop();
            var remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.null;
        });
    });
});

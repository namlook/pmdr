var should = require('chai').should();
var expect = require('chai').expect;
var sinon = require('sinon');

var Pomodoro = require('../src/js/pmdr');


describe('Pomodoro', function() {

    var clock;

    before(function () {
        clock = sinon.useFakeTimers();
    });

    after(function () {
        clock.restore();
    });



    describe('start()', function() {
        it('should start a pomodoro', function() {
            var pmdr = new Pomodoro();
            expect(pmdr.isStarted).to.be.false;

            pmdr.start();
            expect(pmdr.isStarted).to.be.true;
        });
        it('should take an optional number of seconds', function() {
            var pmdr = new Pomodoro();
            pmdr.start(20);
            expect(pmdr.duration).to.be.equal(20);
        });
        it('should have a default duration to 1500 (25 minutes)', function() {
            var pmdr = new Pomodoro();
            pmdr.start();
            expect(pmdr.duration).to.be.equal(1500);
        })
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
        it('should return a positive number', function() {
            var pmdr = new Pomodoro();
            pmdr.start();
            var remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.at.least(0);
        });
        it('should decrease of 1 every seconds', function() {
            var pmdr = new Pomodoro();
            pmdr.start(20);

            var remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.equal(20);
            console.log(remainingSeconds);

            clock.tick(999);
            remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.equal(19);
            console.log(remainingSeconds);

            clock.tick(2);
            remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.equal(18);
            console.log(remainingSeconds);

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

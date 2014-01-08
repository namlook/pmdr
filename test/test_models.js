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
        });
        it('should be stopped when the time is over', function() {
            var pmdr = new Pomodoro();
            pmdr.start(1);
            clock.tick(1000);
            expect(pmdr.isStarted).to.be.false;
        });
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
            pmdr.start(20);

            var remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.at.least(0);
        });
        it('should decrease of 1 every seconds', function() {
            var pmdr = new Pomodoro();
            pmdr.start(20);

            var remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.equal(20);

            clock.tick(900);
            remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.equal(20);

            clock.tick(101);
            remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.equal(19);

            clock.tick(10000);
            remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.equal(9);

        });
        it('should return null if the pomodoro is stopped', function() {
            var pmdr = new Pomodoro();
            pmdr.start();
            pmdr.stop();
            var remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.null;
        });
        it('should return null if the pomodoro is finished', function() {
            var pmdr = new Pomodoro();
            pmdr.start(20);

            clock.tick(25000);
            remainingSeconds = pmdr.getRemainingSeconds();
            expect(remainingSeconds).to.be.null;
        });
    });
});
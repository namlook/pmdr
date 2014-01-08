var should = require('chai').should();
var expect = require('chai').expect;

var Pomodoro = require('../src/js/pmdr');


describe('Pomodoro', function() {
    describe('start()', function() {
        it('should start a pomodoro', function() {
            var pmdr = Pomodoro();
            expect(pmdr.isStarted).to.be.false;

            pmdr.start();
            expect(pmdr.isStarted).to.be.true;
        });
    });

    describe('stop()', function() {
        it('should stop a pomodoro', function() {
            var pmdr = Pomodoro();
            pmdr.start();
            expect(pmdr.isStarted).to.be.true;

            pmdr.stop();
            expect(pmdr.isStarted).to.be.false;
        });
    });

    describe('getRemainingTime()', function() {
        it('should give the time remaining before the end of timer');
    });
});

import { expect } from "chai";
import { TimeMinSec } from "../../../common/GamesStructures/TimeMinSec";
import { Timer } from "./timer";
// const socketIO: Function = require("socket.io");
describe("Test Timer", () => {
    // const socketServer: SocketIO.Server = mock(socketIO);
    // useSocketServer(socketServer, {
    //     controllers: [SocketIOController],
    // });
    const timer: Timer = new Timer("roomTest");
    it("should start the timer on start()",  async () => {
        const timer1: Timer = new Timer("roomTest");
        timer1.reset();
        timer1.startTimer();
        setTimeout(() => {
            timer1.stopTimer();
            expect(timer1.getTime()).to.not.eql({minutes: 0, seconds: 0});
        // tslint:disable-next-line:no-magic-numbers
        },         1000);
    });
    it("should return the right time on getTime()", async () => {
        const timer2: Timer = new Timer("roomTest");
        timer2.reset();
        timer2.startTimer();
        setTimeout(() => {
            timer2.stopTimer();
            expect(timer2.getTime()).to.eql({minutes: 0, seconds: 1});
        // tslint:disable-next-line:no-magic-numbers
        } ,        1000);
    });
    it("should set the time to 0min and 0 sec on reset()", () => {
        timer.reset();
        expect(timer.getTime()).to.eql({minutes: 0, seconds: 0});
    });
    it("should stop the timer on stopTimer()", () => {
        timer.reset();
        timer.startTimer();
        timer.stopTimer();
        const time1: TimeMinSec = timer.getTime();
        const time2: TimeMinSec = timer.getTime();
        expect(time1).to.eql( time2 );
    });
});

import { TimeMinSec } from "../../../common/GamesStructures/TimeMinSec";
import { ioSocket } from "../server";
const ONE_SECOND: number = 1000;
const SECONDS_IN_MINUTE: number = 60;
export class Timer {
  private time: TimeMinSec;
  private incrementTime: NodeJS.Timeout;
  private roomId: string;
  public constructor(_roomId: string) {
    this.time = {minutes: 0, seconds: 0};
    this.roomId = _roomId;
   }

  public reset(): void {
    this.time = {minutes: 0, seconds: 0};
  }

  public startTimer(): void {
    this.incrementTime = setInterval((): void => {
      this.time.seconds++;
      this.time.seconds %= SECONDS_IN_MINUTE;
      if (this.time.seconds === 0) {
        this.time.minutes++;
      }
      if (ioSocket) { ioSocket.in(this.roomId).emit("updateTime", this.time); }
    },                               ONE_SECOND);
  }

  public stopTimer(): void {
    clearInterval(this.incrementTime);
    if (ioSocket) {ioSocket.in(this.roomId).emit("updateTime", this.time); }
  }

  public getTime(): TimeMinSec {
    return this.time;
  }
}

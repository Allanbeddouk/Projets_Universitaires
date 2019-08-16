export enum Status {
    active,
    waiting,
  }

export class Room {
    private id: string;
    private status: Status;
    private host: string;
    public guest: string;

    public constructor(id: string, host: string){
        this.id = id;
        this.status = Status.waiting;
        this.host = host;
        this.guest = "";
    }
    public isWaiting(): boolean{
        return this.status === Status.waiting;
    }
    public join():void{
        if(this.isWaiting()) this.status = Status.active;
    }
    public getId(): string{
        return this.id;
    }

    public getHost(): string {
        return this.host;
    }
}
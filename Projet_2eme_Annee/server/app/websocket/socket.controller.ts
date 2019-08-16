
import {ConnectedSocket, MessageBody, OnMessage, SocketController} from "socket-controllers";
import { TimeMinSec } from "../../../common/GamesStructures/TimeMinSec";
import {MessageBT} from "../../../common/communication/messageBT";
import { MessageDifferenceLibre, MessageDifferenceSimple } from "../../../common/communication/messageDifference";
import { MessageGameUser } from "../../../common/communication/messageGameUser";
import { Position } from "../../../common/communication/position";
import { Room } from "../../../common/communication/room";
import { ioSocket } from "../server";
import { GameStatusService } from "../services/GameStatus.service";
import { Timer } from "./timer";
@SocketController()
export class SocketIOController {
    private timers: Map<String, Timer> = new Map<String, Timer>();
    private rooms: Map<String, Room[]> = new Map<String, Room[]>();
    private gameStatus: GameStatusService;

    public constructor() {
        this.gameStatus = GameStatusService.getInstance();
     }

    @OnMessage("connectionApp")
    public connectionJeu(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() username: string): void {
        socket.broadcast.emit("message", {time: Date.now(), text: " – " + username + " vient de se connecter."} );
    }
    @OnMessage("disconnectionApp")
    public disconnectionJeu(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() username: string): void {
        socket.broadcast.emit("message", {time: Date.now(), text: " – " + username + " vient de se déconnecter."} );
    }
    @OnMessage("createRoom")
    public createRoom(@ConnectedSocket() socket: SocketIO.Socket): void {
        socket.join(socket.id);
        this.startTimer(socket.id);
    }
    @OnMessage("leaveRoom")
    public leaveRoom(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody()  message: MessageGameUser ): void {
        if (message) {
            socket.leave(this.getRoomId(message.gameName, message.username));
        } else {
            socket.leave(socket.id);
        }
    }
    @OnMessage("bestTime")
    public bestTime(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: MessageBT ): void {
    socket.broadcast.emit("message", {time: Date.now(), text: " – " + message.username +
    " obtient la " + message.position +
    " place dans les meilleurs temps du jeu " + message.gameName +
    " en " + message.mode + "."});
    }
    @OnMessage("difference")
    public difference(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody()  message: MessageGameUser): void {
        let mess: string = " – Différence trouvée";
        if (message) {
            mess += " par " + message.username + ".";
            ioSocket.in(this.getRoomId(message.gameName, message.username)).emit("message", {time: Date.now(), text: mess} );
        } else {
            mess += ".";
            ioSocket.in(socket.id).emit("message", {time: Date.now(), text: mess} );
        }
        socket.emit("updateCptr");
    }
    @OnMessage("errorIdent")
    public error(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: MessageGameUser): void {
        let mess: string = " – Erreur";
        if (message) {
            mess += " par " + message.username + ".";
            ioSocket.in(this.getRoomId(message.gameName, message.username)).emit("message", {time: Date.now(), text: mess} );
        } else {
            mess += ".";
            ioSocket.in(socket.id).emit("message", {time: Date.now(), text: mess} );
        }
    }
    @OnMessage("stopTimer")
    public stopTimer(@ConnectedSocket() socket: SocketIO.Socket): void {
        (this.timers.get(socket.id) as Timer).stopTimer();
    }
    @OnMessage("resetTimer")
    public resetTimer(@ConnectedSocket() socket: SocketIO.Socket): void {
        (this.timers.get(socket.id) as Timer).reset();
    }
    @OnMessage("updateTime")
    public updateTime(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() time: TimeMinSec): void {
        ioSocket.in(socket.id).emit("updateTime", time);
    }

    @OnMessage("joinGame")
    public joinGame(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: MessageGameUser): void {
        const tempsRooms: Room[] | undefined = this.rooms.get(message.gameName);
        if (tempsRooms) {
            for (const room of tempsRooms) {
                 if (room.isWaiting()) {
                     room.join();
                     room.guest = message.username;
                     socket.join(room.getId());
                     ioSocket.in(room.getId()).emit("gameJoined", message.gameName);
                     this.startTimer(room.getId());
                     break;
                 }
             }
        }
        socket.broadcast.emit("gameClosed", message.gameName);
        this.gameStatus.setGameClosed(message.gameName);
    }

    @OnMessage("createGame")
    public createGame(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: MessageGameUser): void {
        if (!this.rooms.has(message.gameName)) {
            const tempRooms: Room[] = [new Room(socket.id, message.username)];
            this.rooms.set(message.gameName, tempRooms);
        } else {
            const tempsRooms: Room[] | undefined = this.rooms.get(message.gameName);
            if (tempsRooms) {
                tempsRooms.push(new Room(socket.id, message.username));
                this.rooms.set(message.gameName, tempsRooms);
            }
        }
        socket.join(socket.id);
        this.gameStatus.setGameWaiting(message.gameName);
        socket.broadcast.emit("gameCreated", message.gameName);

    }

    @OnMessage("sendDifference")
    public differenceFound(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: MessageDifferenceSimple): void {
                const position: Position = {x: message.x, y: message.y};
                socket.to(this.getRoomId(message.gameName, message.username)).emit("differenceFound", position);
    }

    @OnMessage("addDifference")
    public sendAddDifference(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: MessageDifferenceLibre): void {
        socket.to(this.getRoomId(message.gameName, message.username)).emit("addDiffFound", message);
    }

    @OnMessage("deleteDifference")
    public sendDeleteDifference(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: MessageDifferenceLibre): void {
        socket.to(this.getRoomId(message.gameName, message.username)).emit("deleteDiffFound", message);
    }

    @OnMessage("colorDifference")
    public sendColorifference(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() message: MessageDifferenceLibre): void {
                socket.to(this.getRoomId(message.gameName, message.username)).emit("colorDiffFound", message);
    }

    @OnMessage("deleteRoom")
    public deleteRoom(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() gameName: string): void {
        const tempsRooms: Room[] | undefined = this.rooms.get(gameName);
        if (tempsRooms) {
        const index: number =  tempsRooms.findIndex((room: Room): boolean => {
                return room.getId() === socket.id;
            });
        tempsRooms.splice(index, 1);
        this.rooms.set(gameName, tempsRooms);
        }
        socket.broadcast.emit("gameClosed", gameName);
        this.gameStatus.setGameClosed(gameName);

    }
    @OnMessage("gameDeleted")
    public gameDeleted(@ConnectedSocket() socket: SocketIO.Socket, @MessageBody() gameName: string): void {
        socket.broadcast.emit("gameDeleted", gameName);
    }
    private getRoomId(gameName: string, username: string): string {
        const tempsRooms: Room[] | undefined = this.rooms.get(gameName);
        if (tempsRooms) {
            let foundRoom: Room | undefined = tempsRooms.find((room: Room) => room.getHost() === username);
            if (!foundRoom) {
               foundRoom = tempsRooms.find((room: Room) => room.guest === username);
            }
            if (foundRoom) {
                return foundRoom.getId();
            }
        }

        return "";
    }
    private startTimer(roomId: string): void {
        this.timers.set(roomId, new Timer(roomId));
        (this.timers.get(roomId) as Timer).startTimer();
    }
}

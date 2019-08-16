import { TestBed } from "@angular/core/testing";
import { HandleViewsService } from "src/app/services/handle-views.service";
import { InitialeService } from "src/app/services/initiale.service";
import { Vector3 } from "three";
import { mock } from "ts-mockito";
import { SimpleGame } from "../../../../../../common/GamesStructures/SimpleGame";
import { TimeMinSec } from "../../../../../../common/GamesStructures/TimeMinSec";
import { MessageDifferenceLibre } from "../../../../../../common/communication/messageDifference";
import { MessageWS } from "../../../../../../common/communication/messageWS";
import { Position } from "../../../../../../common/communication/position";
import { WebSocketCommunications } from "./socket.service";
describe("WebSocketCommunications", () => {
    const viewService: HandleViewsService = new HandleViewsService();
    let socketService: WebSocketCommunications;
    let socketServiceListener: WebSocketCommunications;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        socketService = new WebSocketCommunications(mock(InitialeService), viewService);
        socketServiceListener = new WebSocketCommunications(mock(InitialeService), viewService);
      });

    it("should be created", () => {
        expect(socketService).toBeTruthy();
    });

    it("it should emit a connectionApp message with test as parameter", () => {
        spyOn(socketService["socket"], "emit");
        socketService["initialeService"].username = " a ";
        socketService["viewService"].game = new SimpleGame();
        socketService.connect();
        expect(socketService["socket"].emit).toHaveBeenCalledWith("connectionApp", " a ");
    });

    it("it should emit a disconnectionApp message with test as parameter", () => {
        spyOn(socketService["socket"], "emit");
        socketService.disconnect("test");
        expect(socketService["socket"].emit).toHaveBeenCalledWith("disconnectionApp", "test");
    });

    it("it should emit a erroIdent message", () => {
        spyOn(socketService["socket"], "emit");
        socketService.error();
        expect(socketService["socket"].emit).toHaveBeenCalledWith("errorIdent", undefined);
    });

    it("it should emit a differenceFound message", () => {
        spyOn(socketService["socket"], "emit");
        socketService["initialeService"].username = " Jhonny ";
        socketService["viewService"].game = new SimpleGame("test");
        socketService.differenceFound({x: 0, y: 0});
        expect(socketService["socket"].emit).toHaveBeenCalledWith("sendDifference", {x: 0, y: 0, username: " Jhonny ",
                                                                                     gameName: "test"});
        socketServiceListener.subscribeDifferenceFound(async (position: Position) => {
            expect(position).toEqual({x: 0, y: 0});
        });
    });

    it("it should emit a difference message", () => {
            spyOn(socketService["socket"], "emit");
            socketService.difference();
            expect(socketService["socket"].emit).toHaveBeenCalledWith("difference", undefined);
            socketServiceListener.subscribeUpdateCptrSolo(() => { return;
            });
    });

    it("it should emit a best time message with a MessageBT as parameter ", () => {
            spyOn(socketService["socket"], "emit");
            socketService["initialeService"].username = " Jhonny ";
            socketService["viewService"].game = new SimpleGame("test");
            socketService.bestTime("1", "solo");
            expect(socketService["socket"].emit).toHaveBeenCalledWith("bestTime",
                                                                      { username: " Jhonny " , position: "1",
                                                                        gameName: "test", mode: "solo"});
            socketServiceListener.subscribeMessage((message: MessageWS) => {
                expect(message.text).toEqual("");
            });
        });

    it("it should emit a createRoom message", () => {
            spyOn(socketService["socket"], "emit");
            socketService.createGameSolo();
            expect(socketService["socket"].emit).toHaveBeenCalledWith("createRoom");
        });

    it("it should emit a leaveRoom message", () => {
            spyOn(socketService["socket"], "emit");
            socketService.leaveRoom();
            expect(socketService["socket"].emit).toHaveBeenCalledWith("leaveRoom", undefined);
        });

    it("it should emit a errorIdent message", () => {
            spyOn(socketService["socket"], "emit");
            socketService.error();
            expect(socketService["socket"].emit).toHaveBeenCalledWith("errorIdent", undefined);
        });

    it("it should emit a stopTimer message", () => {
            spyOn(socketService["socket"], "emit");
            socketService.stopTimer();
            expect(socketService["socket"].emit).toHaveBeenCalledWith("stopTimer");
            socketServiceListener.subscribeTime((time: TimeMinSec) => {
                expect(time);
            });
        });

    it("it should emit a resetTimer message", () => {
            spyOn(socketService["socket"], "emit");
            socketService.resetTimer();
            expect(socketService["socket"].emit).toHaveBeenCalledWith("resetTimer");
        });

    it("it should emit a createGame message", () => {
            spyOn(socketService["socket"], "emit");
            socketService["initialeService"].username = " Jhonny ";
            socketService["viewService"].game = new SimpleGame("test");
            socketService.createGame1v1();
            expect(socketService["socket"].emit).toHaveBeenCalledWith("createGame", { username: " Jhonny ", gameName: "test"});
            socketServiceListener.subscribeGameCreation((gameName: string) => {
                expect(gameName).toEqual("test");
            });
        });
    it("it should emit a joinGame message", () => {
            spyOn(socketService["socket"], "emit");
            socketService["initialeService"].username = " Jhonny ";
            socketService["viewService"].game = new SimpleGame("test");
            socketService.joinGame();
            expect(socketService["socket"].emit).toHaveBeenCalledWith("joinGame", { username: " Jhonny ", gameName: "test"});
            socketServiceListener.subscribeGameJoined((gameName: string) => {
                expect(gameName).toEqual("test");
            });
            socketServiceListener.subscribeGameClosed((gameName: string) => {
                expect(gameName).toEqual("test");
            });
        });

    it("it should emit a deleteRoom message", () => {
            spyOn(socketService["socket"], "emit");
            socketService["viewService"].game = new SimpleGame("test");
            socketService.cancelGameCreaton();
            expect(socketService["socket"].emit).toHaveBeenCalledWith("deleteRoom", "test");
        });

    it("it should emit a gameDeleted message", () => {
            spyOn(socketService["socket"], "emit");
            socketService.gameDeleted("test");
            expect(socketService["socket"].emit).toHaveBeenCalledWith("gameDeleted", "test");
            socketServiceListener.subscribeGameDeleted((gameName: string) => {
                expect(gameName).toEqual("test");
            });
        });
    it("it should emit a addDifference message", () => {
            spyOn(socketService["socket"], "emit");
            socketService["initialeService"].username = " Jhonny ";
            socketService["viewService"].game = new SimpleGame("test");
            socketService.differenceFreeGame("add", new Vector3, new Vector3 );
            expect(socketService["socket"].emit).toHaveBeenCalledWith("addDifference", {originalObj: {x: 0, y: 0, z: 0},
                                                                                        modifiedObj: {x: 0, y: 0, z: 0},
                                                                                        username: " Jhonny ", gameName: "test"});
            socketServiceListener.suscribeAddDiff((message: MessageDifferenceLibre) => {
                expect(message).toEqual({originalObj: {x: 0, y: 0, z: 0}, modifiedObj: {x: 0, y: 0, z: 0}, username: " Jhonny ",
                                         gameName: "test"});
            });
        });

    it("it should emit a deleteDifference message", () => {
            spyOn(socketService["socket"], "emit");
            socketService["initialeService"].username = " Jhonny ";
            socketService["viewService"].game = new SimpleGame("test");
            socketService.differenceFreeGame("delete", new Vector3, new Vector3 );
            expect(socketService["socket"].emit).toHaveBeenCalledWith("deleteDifference",
                                                                      {originalObj: {x: 0, y: 0, z: 0},
                                                                       modifiedObj: {x: 0, y: 0, z: 0},
                                                                       username: " Jhonny ",
                                                                       gameName: "test"});
            socketServiceListener.suscribeDeleteDiff((message: MessageDifferenceLibre) => {
            expect(message).toEqual({originalObj: {x: 0, y: 0, z: 0},
                                     modifiedObj: {x: 0, y: 0, z: 0},
                                     username: " Jhonny ",
                                     gameName: "test"});
                                                                                        });
        });

    it("it should emit a colorDifference message", () => {
            spyOn(socketService["socket"], "emit");
            socketService["initialeService"].username = " Jhonny ";
            socketService["viewService"].game = new SimpleGame("test");
            socketService.differenceFreeGame("color", new Vector3, new Vector3 );
            expect(socketService["socket"].emit).toHaveBeenCalledWith("colorDifference",
                                                                      {originalObj: {x: 0, y: 0, z: 0},
                                                                       modifiedObj: {x: 0, y: 0, z: 0},
                                                                       username: " Jhonny ",
                                                                       gameName: "test"});
            socketServiceListener.suscribeColorDiff((message: MessageDifferenceLibre) => {
                expect(message).toEqual({originalObj: {x: 0, y: 0, z: 0},
                                         modifiedObj: {x: 0, y: 0, z: 0},
                                         username: " Jhonny ",
                                         gameName: "test"});
            });
        });
});


import { injectable } from "inversify";
import { Game } from "../../../common/GamesStructures/Game";
import { Player } from "../../../common/GamesStructures/Player";
import { IFreeGameModel, ISimpleGameModel,  Mongoose } from "../Database/db";
import { HighscoreManip } from "../Game/HighscoreManip.service";

@injectable()
export class HighScoreService {
    public async buildHighScoresSolo(gameName: string, activePlayer: Player, games: Game[]): Promise<Player[]> {
        activePlayer.seconds = this.ajustSeconds(activePlayer.seconds);
        const players: Player[] = [];
        const activeGame: Game | undefined = games.find( (game: Game) => game.name === gameName );
        if (activeGame) {
            this.transferHighScores(activeGame.hsSolo, players);
            this.orderHighScores(players, activePlayer);
        }

        return players;
    }

    public async buildHighScores1v1(gameName: string, activePlayer: Player, games: Game[]): Promise<Player[]> {
        activePlayer.seconds = this.ajustSeconds(activePlayer.seconds);
        const players: Player[] = [];
        const activeGame: Game | undefined = games.find( (game: Game) => game.name === gameName );
        if (activeGame) {
            this.transferHighScores(activeGame.hs1v1, players);
            this.orderHighScores(players, activePlayer);
        }

        return players;
    }

    public async getHighScorePosition(players: Player[], activePlayer: Player): Promise<string> {
        let position: number = 0;
        players.forEach( async (player: Player, index: number) => {
            if (this.isActivePlayer(player, activePlayer)) {
                    position = index + 1;
            }
        });

        return String(position);
    }

    public transferHighScores(dbplayers: Player[], localPlayers: Player[]): void {
        for (const highscore of dbplayers) {
            localPlayers.push(highscore);
       }
    }

    public isActivePlayer(playerInArray: Player, activePlayer: Player): boolean {
        return playerInArray.name === activePlayer.name &&
               playerInArray.minutes === activePlayer.minutes &&
               playerInArray.seconds === activePlayer.seconds;
    }

    public orderHighScores(players: Player[], activePlayer: Player ): void {
        players.push(activePlayer);
        HighscoreManip.OrderByArray(players, "seconds");
        HighscoreManip.OrderByArray(players, "minutes");
        players.pop();
    }

    public ajustSeconds(seconds: string): string {
        if (seconds.length === 1) {
            seconds = "0" + seconds;
        }

        return seconds;
    }

    public async updateHighScoreSolo(gameName: string, players: Player[],
                                     model: Mongoose.Model<IFreeGameModel> | Mongoose.Model<ISimpleGameModel>): Promise<Boolean> {
        // tslint:disable-next-line:typedef
        return new Promise<boolean>((resolve, reject) => {
            model.updateOne(
                    {name: gameName},
                    {$set : { solo: JSON.stringify(players)}},
                    (err: unknown) => {
                if (err) {
                  resolve(false);
                  reject(err);
                }  else {
                  resolve(true);
                }
            });
        });
    }

    public async updateHighScore1v1(gameName: string, players: Player[],
                                    model: Mongoose.Model<IFreeGameModel> | Mongoose.Model<ISimpleGameModel>): Promise<Boolean> {
        // tslint:disable-next-line:typedef
        return new Promise<boolean>((resolve, reject) => {
          model.updateOne(
                    {
                    name: gameName},
                    {
                    $set : { oneVsOne: JSON.stringify(players)}},
                    (err: unknown) => {
                if (err) {
                  resolve(false);
                  reject(err);
                }  else {
                  resolve(true);
                }
            });
        });
    }
}

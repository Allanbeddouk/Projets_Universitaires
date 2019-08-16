export class GameInfo {
    public isSimple: boolean;
    public user: string;
    public gameName: string;
    public isWon: boolean;
    public isWinner: boolean;
    public constructor(_isSimple: boolean, _user: string, _gameName: string, _isWon: boolean, _isWinner: boolean) {
        this.isSimple = _isSimple;
        this.user = _user;
        this.gameName = _gameName;
        this.isWon = _isWon;
        this.isWinner = _isWinner;
    }
}

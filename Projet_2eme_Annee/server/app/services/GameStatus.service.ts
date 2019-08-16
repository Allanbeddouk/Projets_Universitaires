
export class GameStatusService {
    private static instance: GameStatusService;
    private games: Map<string, boolean>;

    public static getInstance(): GameStatusService {
        if (!GameStatusService.instance) {
            GameStatusService.instance = new GameStatusService();
        }

        return GameStatusService.instance;
    }

    private constructor() {
        this.games = new Map<string, boolean>();
    }

    public addGame(gameName: string): void {
        if (!this.games.has(gameName)) {
            this.games.set(gameName, false);
        }
    }

    public setGameWaiting(gameName: string): void {
        this.games.set(gameName, true);
    }

    public setGameClosed(gameName: string): void {
        this.games.set(gameName, false);
    }

    public getGameStatus(gameName: string): boolean {

        return this.games.get(gameName) as boolean;
    }

}

import { Player } from "../../../common/GamesStructures/Player";

export class HighscoreManip {

    public static OrderByArray(array: Player[], element: string): Player[] {
        return array.sort((a: Player, b: Player) => {
            if (a[element] < b[element]) {
                return -1;
            }
            if (a[element] > b[element]) {
                return 1;
            }

            return 0;
        });
    }
}

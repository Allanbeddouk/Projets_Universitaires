export enum Geometry {
    Sphere = "sphere",
    Cube = "cube",
    Cone = "cone",
    Cylinder = "cylinder",
    Pyramid = "pyramid",
}

const RGB_MAX_VALUE: number = 255;
const MAX_DECIMALS: number = 2;

const isInteger: Function = (num: number): boolean => {
    return (num - Math.floor(num)) === 0;
};

export const randomNumber: Function = (min: number, max: number): number => {
    return isInteger(min) ? Math.floor(Math.random() * (max - min + 1)) + min :
                            +(Math.random() * (max - min) + min).toFixed(MAX_DECIMALS);
};

export const randomColor: Function = () => {
    return "rgb(" + randomNumber(0, RGB_MAX_VALUE) + ", "
    + randomNumber(0, RGB_MAX_VALUE) + ", "
    + randomNumber(0, RGB_MAX_VALUE) + ")";
};

export const POKEMONS: string[] = [
    "Charizard&2", "Charmander&4", "Eevee&4", "Gyarados&1.5", "Lapras&0.04", "Lugia&1", "Mew&6", "Mewtwo&2", "Pikachu&6",
    "Rattata&6", "Snorlax&0.04", "Tauros&0.14", "Staryu&0.08", "Metagross&1.5", "Umbreon&3", "Groudon&1", "Lucario&2.5",
    "Ampharos&2", "Entei&1.5", "Xerneas&0.9", "Swampert&2", "Zorua&3.5", "Absol&2.5", "Alakazam&1.7", "HO-Oh&0.8", "Yveltal&0.8",
    "Kyogre&1.3"];
export enum Size {
    Small = "small",
    Medium = "medium",
    Big = "big",
}

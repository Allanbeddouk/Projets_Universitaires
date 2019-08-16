export abstract class Constants {
    public static readonly NB_MIN_ITEMS: number = 10;
    public static readonly NB_MAX_ITEMS: number = 200;

    public static readonly MIN_ROTATION: number = 1;
    public static readonly MAX_ROTATION: number = 12;

    public static readonly BOUNDING_SIZE: number = 19;
    public static readonly TWO_DIVID: number = 2;

    public static readonly SHIFT_BOXES: number = 1.5 * Constants.BOUNDING_SIZE;

    public static readonly MAX_X: number = Constants.BOUNDING_SIZE * Constants.BOUNDING_SIZE;
    public static readonly MAX_Z: number = Constants.BOUNDING_SIZE * Constants.BOUNDING_SIZE;
  }

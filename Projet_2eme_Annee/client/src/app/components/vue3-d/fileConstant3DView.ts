export abstract class Constants {
  public static readonly MOVEMENT_SPEED: number = 0.75;
  public static readonly FOV: number = 50;
  public static readonly NEAR: number = 0.1;
  public static readonly FAR: number = 20000;
  public static readonly INDEX_0: number = 0;
  public static readonly INDEX_1: number = 1;
  public static readonly INDEX_2: number = 2;
  public static readonly INDEX_3: number = 3;
  public static readonly INDEX_4: number = 4;
  public static readonly INDEX_5: number = 5;
  public static readonly TWO_HUNDRED: number = 200;
  public static readonly DIVIDEBY2: number = 2;
  public static readonly CAMERA_POSITION_Z: number = 50;
  public static readonly CAMERA_POSITION_Y: number = 4;
  public static readonly CAMERA_POSITION_X: number = 0;
  public static readonly CAMERA_MAX_POSITION_Y: number = 0.4;
  public static readonly CAMERA_MIN_POSITION_Y: number = -0.4;
  public static readonly FLOOR_COLOR: number = 0x4012050;
  public static readonly LIGHT_POSITION_X: number = 5;
  public static readonly LIGHT_POSITION_Y: number = 5;
  public static readonly LIGHT_POSITION_Z: number = 1;
  public static readonly lightColor: number = 0x404040;
  public static readonly RIGHTCLICK: number = 2;
  public static readonly LEFTCLICK: number = 0;
  public static readonly STANDING: number = 4;
  public static readonly ROTATION_ANGLE: number = (Math.PI / Constants.TWO_HUNDRED);
  public static readonly CAMERA_ROTATION_SPEED_MODIFICATOR: number = 500;
  public static readonly BOUNDING_SIZE: number = 16;
  public static readonly SKYBOX_SIZE: number = 750;
  public static readonly SKYBOX_HEIGHT: number = 375;
  public static readonly PLAYER_COLLISION_DISTANCE: number = 5;
}

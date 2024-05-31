import { Constants } from "../constants";
import { LocationType } from "../locations";
import { ItemType } from "../objects";
import MainGame from "../scenes/mainGame";

export default class CameraManager {
  private startingCoords: { [houseType: number]: { x: number; y: number } } =
    {};
  private scene: MainGame;
  private locationType: LocationType = LocationType.FARM;

  constructor(scene: MainGame) {
    this.scene = scene;
    this.startingCoords = {
      [LocationType.FARM]: { x: 0, y: 0 },
      [LocationType.WEST]: { x: 0, y: 0 },
    };
  }

  public initialize(locationType: LocationType) {
    this.locationType = locationType;
    this.addCamera(locationType);
  }

  private addCamera(locationType: LocationType) {
    // Set camera position
    this.scene.cameras.main.scrollX = this.startingCoords[locationType].x;
    this.scene.cameras.main.scrollY = this.startingCoords[locationType].y;

    // Set camera bounds
    this.scene.cameras.main.setBounds(
      0,
      0,
      Constants.MAP_WIDTH * Constants.TILE_DISPLAY_SIZE,
      Constants.MAP_HEIGHT * Constants.TILE_DISPLAY_SIZE
    );

    // Make camera draggable
    this.scene.input.on("pointerdown", (pointer: any) => {
      if (
        pointer.middleButtonDown() ||
        (pointer.leftButtonDown() &&
          this.scene.itemManager?.selectedItem?.getType() == ItemType.TRAVEL)
      ) {
        this.scene.input.on("pointermove", (pointer: any) => {
          this.scene.cameras.main.scrollX -= pointer.x - pointer.prevPosition.x;
          this.scene.cameras.main.scrollY -= pointer.y - pointer.prevPosition.y;
        });
      }

      this.scene.input.on("pointerup", () => {
        this.scene.input.off("pointermove");
      });
    });
  }

  public destroy() {
    this.saveScrollXandY();
  }

  private saveScrollXandY() {
    this.startingCoords[this.locationType].x = this.scene.cameras.main.scrollX;
    this.startingCoords[this.locationType].y = this.scene.cameras.main.scrollY;
  }

  public resetCamera() {
    this.scene.cameras.main.scrollX = 0;
    this.scene.cameras.main.scrollY = 0;
  }
}

import { Constants } from "../constants";
import { HouseType } from "../locations";
import { ItemType } from "../objects";
import MainGame from "../scenes/mainGame";

export default class CameraManager {
  private startingCoords: { [houseType: number]: { x: number; y: number } } =
    {};
  private scene: MainGame;
  private currLoc: HouseType = HouseType.FARM;

  constructor(scene: MainGame) {
    this.scene = scene;
    this.startingCoords = {
      [HouseType.BARN]: { x: 0, y: 0 },
      [HouseType.FARM]: { x: 0, y: 0 },
      [HouseType.MARKET]: { x: 0, y: 0 },
      [HouseType.HOME]: { x: 0, y: 0 },
      [HouseType.WEST]: { x: 0, y: 0 },
      [HouseType.NEIGHBOR]: { x: 0, y: 0 },
    };
  }

  public initialize(houseType: HouseType) {
    this.currLoc = houseType;
    this.addCamera(houseType);
  }

  private addCamera(houseType: HouseType) {
    // Set camera position
    this.scene.cameras.main.scrollX = this.startingCoords[houseType].x;
    this.scene.cameras.main.scrollY = this.startingCoords[houseType].y;

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
    this.startingCoords[this.currLoc].x = this.scene.cameras.main.scrollX;
    this.startingCoords[this.currLoc].y = this.scene.cameras.main.scrollY;
  }
}
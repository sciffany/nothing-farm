import { Constants, Layer } from "../constants";
import MainGame from "../scenes/mainGame";

const START_ENERGY = 1000;

export default class EnergyManager {
  private scene: MainGame;
  private energy: number = START_ENERGY;
  private marker: Phaser.GameObjects.Image | null = null;

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize() {
    this.drawEnergyBar();
  }

  public getEnergy() {
    return this.energy;
  }

  public addEnergy(amount: number) {
    this.energy += amount;
    this.marker?.setScale(this.energy / START_ENERGY, 1);
  }

  private drawEnergyBar() {
    this.marker = this.scene.add
      .image(
        Constants.WIDTH - 4 * Constants.TILE_DISPLAY_SIZE,
        Constants.TILE_DISPLAY_SIZE * 2,
        "marker",
        0
      )
      .setOrigin(0, 0);
    this.marker.setScrollFactor(0);
    this.marker.depth = Layer.UI;
    this.marker.blendMode = Phaser.BlendModes.ADD;
  }

  public refill() {
    this.energy = START_ENERGY;
    this.marker?.setScale(1, 1);
  }
}

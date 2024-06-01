import { Constants, Layer } from "../constants";
import { LocationType } from "../locations";
import MainGame from "../scenes/mainGame";

export class PopulationManager {
  public scene: MainGame;
  public population: number = 0;
  public populationText: Phaser.GameObjects.Text | null = null;

  constructor(scene: MainGame) {
    this.scene = scene;
  }

  public initialize() {
    this.population = 0;

    const marker = this.scene.add.sprite(
      Constants.WIDTH - 4 * Constants.TILE_DISPLAY_SIZE,
      Constants.HEIGHT - 3 * Constants.TILE_DISPLAY_SIZE,
      "marker",
      0
    );

    marker.setOrigin(0, 0);
    marker.setScrollFactor(0);
    marker.depth = Layer.UI;

    this.populationText = this.scene.add.text(
      Constants.WIDTH - 2 * Constants.TILE_DISPLAY_SIZE,
      Constants.HEIGHT - 2.5 * Constants.TILE_DISPLAY_SIZE,
      `Pop: ${this.population}`,
      Constants.TEXT_PROPS
    );

    this.populationText.setOrigin(0.5, 0.5);
    this.populationText.setScrollFactor(0);
    this.populationText.depth = Layer.UI;
  }

  public addPopulation(amount: number) {
    this.population += amount;
    this.updatePopulationText();
  }

  public updatePopulationText() {
    if (this.populationText) {
      this.populationText.setText(`Pop: ${this.population}`);
    }
  }
}

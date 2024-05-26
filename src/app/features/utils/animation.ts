import { Constants, Layer } from "../constants";

const BLAST_DURATION = 200;

export const fadeOut = (targets: any, duration: any) => ({
  alpha: 0,
  targets,
  duration,
});

const rand = (limit: number) => Math.floor(Math.random() * limit);

export function animation(scene: Phaser.Scene, x: number, y: number) {
  for (var i = 0; i < 10; i++) {
    const blastDur = rand(BLAST_DURATION) * 4;
    const fireSprite = scene.add.circle(x, y, rand(10), 0xb55945, 1);
    scene.tweens.add({
      x:
        x + rand(Constants.TILE_DISPLAY_SIZE) - Constants.TILE_DISPLAY_SIZE / 2,
      y:
        y + rand(Constants.TILE_DISPLAY_SIZE) - Constants.TILE_DISPLAY_SIZE / 2,
      targets: fireSprite,
      duration: blastDur,
    });
    scene.tweens.add(fadeOut(fireSprite, BLAST_DURATION));
    setTimeout(() => fireSprite.destroy(), blastDur);
    fireSprite.depth = Layer.UI;
  }
}

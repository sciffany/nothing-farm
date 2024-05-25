import { Constants } from "../constants";
import { PICKUPABLE_OBJECTS, PickupableObjectType } from "../objects";

export function drawPickupableObject(
  scene: Phaser.Scene,
  objectType: PickupableObjectType,
  x: number,
  y: number
) {
  if (objectType == PickupableObjectType.NONE) {
    return () => {};
  }
  const sprite = scene.add.sprite(
    x * Constants.TILE_DISPLAY_SIZE,
    y * Constants.TILE_DISPLAY_SIZE,
    PICKUPABLE_OBJECTS[objectType].sprite,
    PICKUPABLE_OBJECTS[objectType].frame
  );

  sprite.setOrigin(0, 0);
  sprite.setScale(2);

  function destroy() {
    sprite.destroy();
  }

  return destroy;
}

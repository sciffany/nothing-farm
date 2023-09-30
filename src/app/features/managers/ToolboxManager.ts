
export default class ToolboxManager {
    private scene: Phaser.Scene;

    constructor(scene: Phaser.Scene) {
        this.scene = scene;
    }

    public initialize() {
       this.drawToolbox();
    }

    private drawToolbox() {
        const boxes = Array.from({ length: 16 }, (_, i) => i).map((i) => {
            const box = this.scene.add.sprite(0, 0, "tools", 15).setOrigin(0, 0);
            box.y = 16 * i;
            box.setScrollFactor(0);
            return box;
        });
    }
}
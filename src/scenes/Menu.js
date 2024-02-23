class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        console.log("-> MENU SCENE :^)")    // making sure

        const map = this.add.tilemap('menuTilemapJSON')
        const tileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        const bgLayer = map.createLayer('Background', tileset, 0, 0)
        const frameLayer = map.createLayer('Frame', tileset, 0, 0)
        const mapLayer = map.createLayer('Map', tileset, 0, 0)
        const questionLayer = map.createLayer('Question', tileset, 0, 0)
        const highlightLayer = map.createLayer('Highlight', tileset, 0, 0)
    }
}
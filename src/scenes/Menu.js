class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        console.log('%cMENU SCENE :^)', "color: #cfd1af")   // making sure

        // play my little tune
        this.tune = this.sound.add('tune1', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })
        this.tune.play()

        const map = this.add.tilemap('menuTilemapJSON')
        const tileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        map.createLayer('Background', tileset, 0, 0)
        const frameLayer = map.createLayer('Frame', tileset, 0, 0)
        const mapLayer = map.createLayer('Map', tileset, 0, 0)
        const questionLayer = map.createLayer('Question', tileset, 0, 0)
        const highlightLayer = map.createLayer('Highlight', tileset, 0, 0)
    }

    update() {
        if(cursors.right.isDown) {
            this.scene.start('level0Scene')
        }
    }
}
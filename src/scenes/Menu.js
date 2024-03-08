class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    create() {
        console.log('%cMENU SCENE :^)', "color: #cfd1af")   // making sure

        const map = this.add.tilemap('menuTilemapJSON')
        const tileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        map.createLayer('Background', tileset, 0, 0)
        map.createLayer('Frame', tileset, 0, 0)
        map.createLayer('Map', tileset, 0, 0)
        map.createLayer('Question', tileset, 0, 0)
        map.createLayer('Highlight', tileset, 0, 0)

        // temporary navigation
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)
    }

    update() {
        if(key1.isDown) { this.scene.start('whatScene') }
        if(key2.isDown) { this.scene.start('isScene') }
        if(key3.isDown) { this.scene.start('itScene') }
    }
}
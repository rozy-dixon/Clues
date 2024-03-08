class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        console.log('%cTITLE SCENE :^)', "color: #cfd1af")  // making sure

        // play my little tune
        this.tune = this.sound.add('tune1', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })

        // set background
        const map = this.add.tilemap('menuTilemapJSON')
        const tileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        map.createLayer('Background', tileset, 0, 0)
        map.createLayer('Frame', tileset, 0, 0)

        // title and 
        this.add.bitmapText(centerX, 80, 'rozyPixelFont', 'CLUES', 8).setOrigin(0.5)
        this.add.bitmapText(centerX, 112, 'rozyPixelFont', 'UP FOR START', 8).setOrigin(0.5)
        this.add.bitmapText(centerX, 120, 'rozyPixelFont', 'R FOR RULES', 8).setOrigin(0.5)
        this.add.bitmapText(centerX, 128, 'rozyPixelFont', 'C FOR CREDITS', 8).setOrigin(0.5)
        this.add.bitmapText(centerX, 136, 'rozyPixelFont', 'SHIFT AND F TO FORGET', 8).setOrigin(0.5)
    }

    update() {
        if(cursors.up.isDown) {
            this.tune.play()
            this.scene.start('menuScene')
        }
        if(cursors.shift.isDown && cursors.left.isDown) {
            localStorage.clear()
        }
    }
}
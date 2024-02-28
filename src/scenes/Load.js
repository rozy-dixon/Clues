class Load extends Phaser.Scene {
    constructor() {
        super('loadScene')
    }

    preload() {
        // loading bar
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        let loadingBar = this.add.graphics()
        this.load.on('progress', (value) => {
            loadingBar.clear()
            loadingBar.fillStyle(0xFFFFFF, 1)
            loadingBar.fillRect(0, centerY, w * value, 1)
        })
        this.load.on('complete', () => {
            loadingBar.destroy()
        })

        // load tilemaps
        this.load.image('cluesTilesheetPNG', './assets/clues_tilesheet.png')
        this.load.tilemapTiledJSON('menuTilemapJSON', './assets/tilemaps/menuTilemap.json')
        // load tunes
        this.load.audio('tune1', './assets/audio/tune1.mp3')
        // load font
        this.load.bitmapFont('rozyPixelFont', './assets/fonts/rozyPixelFont.png', './assets/fonts/rozyPixelFont.xml')
        // load spritesheet
        this.load.spritesheet('player', './assets/spritesheets/player.png', { frameWidth: 5, frameHeight: 5 })
    }

    create() {
        console.log('%cLOAD SCENE :^)', "color: #cfd1af")   // making sure

        // create player character animation
        this.anims.create({
            key: 'neutral',
            frames: this.anims.generateFrameNames('player', { start: 0, end: 3 }),
            frameRate: 2,
            repeat: -1
        })

        // check for local storage browser support
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        window.localStorage ? console.log('%cLocal storage supported by this cat! (^･･^=)~', "color: #91aa86") : console.log('%cLocal storage not supported by this cat ~(=^･･^)', "color: #c088ae")

        this.scene.start('titleScene')
    }
}
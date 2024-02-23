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
    }

    create() {
        console.log("-> LOAD SCENE :^)")    // making sure

        // check for local storage browser support
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        window.localStorage ? console.log('Local storage supported') : console.log('Local storage not supported')

        this.scene.start('titleScene')
    }
}
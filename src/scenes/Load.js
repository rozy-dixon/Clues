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
        this.load.image('levelTilesheetPNG', './assets/level_tilesheet.png')
        this.load.tilemapTiledJSON('menuTilemapJSON', './assets/tilemaps/menuTilemap.json')
        // load tunes
        this.load.audio('tune1', './assets/audio/tune1.mp3')
        this.load.audio('tune2', './assets/audio/tune2.mp3')
        this.load.audio('tune3', './assets/audio/tune3.mp3')
        this.load.audio('solved', './assets/audio/solved.mp3')
        // load sfx
        this.load.audio('select', './assets/audio/select.wav')
        this.load.audio('jump', './assets/audio/jump.wav')
        this.load.audio('respawn', './assets/audio/respawn.wav')
        // load font
        this.load.bitmapFont('ZXSpectrum', './assets/fonts/ZXSpectrum.png', './assets/fonts/ZXSpectrum.xml')
        this.load.bitmapFont('ZXSpectrumWhite', './assets/fonts/ZXSpectrumWhite.png', './assets/fonts/ZXSpectrumWhite.xml')
        // load spritesheets and images
        this.load.spritesheet('player', './assets/spritesheets/player.png', { frameWidth: 5, frameHeight: 5 })
        this.load.image('letter', './assets/letter.png')
        this.load.image('1PParticle', './assets/particles/1PParticle.png')
        this.load.image('4PParticle', './assets/particles/4PParticle.png')
        this.load.image('9PParticle', './assets/particles/9PParticle.png')
        this.load.image('16PParticle', './assets/particles/16PParticle.png')
    }

    create() {
        console.log('%cLOAD SCENE :^)', "color: #cfd1af")   // making sure

        // create player character animation
        this.anims.create({
            key: 'jump',
            frames: this.anims.generateFrameNames('player', { start: 0, end: 3 }),
            frameRate: 5,
            repeat: -1
        })
        this.anims.create({
            key: 'buzz',
            frames: this.anims.generateFrameNames('player', { start: 0, end: 3 }),
            frameRate: 15,
            repeat: 5
        })

        // check for local storage browser support
        // https://github.com/nathanaltice/Paddle-Parkour-P360 used as reference
        window.localStorage ? console.log('%cLocal storage supported by this cat! (^･･^=)~', "color: #91aa86") : console.log('%cLocal storage not supported by this cat ~(=^･･^)', "color: #c088ae")

        this.scene.start('titleScene')
    }
}
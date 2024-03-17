class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        console.log('%cTITLE SCENE :^)', "color: #cfd1af")  // making sure

        // set border color
        document.getElementsByTagName('canvas')[0].style.borderColor = '#FFFFFF'

        // play my little tune
        this.tune1 = this.sound.add('tune1', { 
            mute: false,
            volume: 1,
            rate: 1,
            loop: true
        })
        this.tune2 = this.sound.add('tune2', { 
            mute: false,
            volume: 0,
            rate: 1,
            loop: true
        })
        this.tune3 = this.sound.add('tune3', { 
            mute: false,
            volume: 0,
            rate: 1,
            loop: true
        })
        this.solved = this.sound.add('solved', { 
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
        this.add.bitmapText(centerX, 80, 'ZXSpectrum', 'CLUES', 7).setOrigin(0.5)
        this.add.bitmapText(centerX, 112, 'ZXSpectrum', 'UP FOR START', 7).setOrigin(0.5)
        this.add.bitmapText(centerX, 120, 'ZXSpectrum', 'R FOR RULES', 7).setOrigin(0.5)
        this.add.bitmapText(centerX, 128, 'ZXSpectrum', 'C FOR CREDITS', 7).setOrigin(0.5)

        keyFORGET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    }

    update() {
        if(cursors.up.isDown) {
            this.tune1.play()
            this.tune2.play()
            this.tune3.play()
            this.scene.start('menuScene', {
                tune1: this.tune1,
                tune2: this.tune2,
                tune3: this.tune3,
                solved: this.solved
            })
        }
        if(Phaser.Input.Keyboard.JustDown(keyFORGET)) {
            console.log('%cYOU HAVE FORGOTTEN.', "color: #c088ae")
            localStorage.clear()
        }
    }
}
class Menu extends Phaser.Scene {
    constructor() {
        super('menuScene')
    }

    init(data) {
        this.tune1 = data.tune1
        this.tune2 = data.tune2
        this.tune3 = data.tune3
        this.solved = data.solved
    }

    create() {
        console.log('%cMENU SCENE :^)', "color: #cfd1af")   // making sure

        // set border color
        document.getElementsByTagName('canvas')[0].style.borderColor = '#FFFFFF'

        // tile config
        const map = this.add.tilemap('menuTilemapJSON')
        const tileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        const levelTileset = map.addTilesetImage('level_tilesheet', 'levelTilesheetPNG')
        map.createLayer('Background', tileset, 0, 0)
        map.createLayer('Frame', tileset, 0, 0)
        map.createLayer('Map', tileset, 0, 0)
        map.createLayer('Question', tileset, 0, 0)
        map.createLayer('Highlight', tileset, 0, 0)
        if(localStorage.getItem('forClue') == 'true') {
            console.log('%cITS CUT SCENE TIME', "color: #91aa86")
            map.createLayer('MenuGlitch', levelTileset, 0, 0)
            map.createLayer('WhatIsItThatYouAreLookingFor', levelTileset, 0, 0)
            this.add.bitmapText(8*8, 21*8, 'ZXSpectrumWhite', 'W', 7).setOrigin(0)
            this.add.bitmapText(9*8, 21*8, 'ZXSpectrumWhite', 'H', 7).setOrigin(0)
            this.add.bitmapText(10*8, 21*8, 'ZXSpectrumWhite', 'A', 7).setOrigin(0)
            this.add.bitmapText(11*8, 21*8, 'ZXSpectrumWhite', 'T', 7).setOrigin(0)

            this.add.bitmapText(13*8, 21*8, 'ZXSpectrumWhite', 'I', 7).setOrigin(0)
            this.add.bitmapText(14*8, 21*8, 'ZXSpectrumWhite', 'S', 7).setOrigin(0)

            this.add.bitmapText(16*8, 21*8, 'ZXSpectrumWhite', 'I', 7).setOrigin(0)
            this.add.bitmapText(17*8, 21*8, 'ZXSpectrumWhite', 'T', 7).setOrigin(0)

            this.add.bitmapText(19*8, 21*8, 'ZXSpectrumWhite', 'T', 7).setOrigin(0)
            this.add.bitmapText(20*8, 21*8, 'ZXSpectrumWhite', 'H', 7).setOrigin(0)
            this.add.bitmapText(21*8, 21*8, 'ZXSpectrumWhite', 'A', 7).setOrigin(0)
            this.add.bitmapText(22*8, 21*8, 'ZXSpectrumWhite', 'T', 7).setOrigin(0)

            this.add.bitmapText(24*8, 21*8, 'ZXSpectrumWhite', 'Y', 7).setOrigin(0)
            this.add.bitmapText(25*8, 21*8, 'ZXSpectrumWhite', 'O', 7).setOrigin(0)
            this.add.bitmapText(26*8, 21*8, 'ZXSpectrumWhite', 'U', 7).setOrigin(0)

            this.add.bitmapText(9*8, 23*8, 'ZXSpectrumWhite', 'A', 7).setOrigin(0)
            this.add.bitmapText(10*8, 23*8, 'ZXSpectrumWhite', 'R', 7).setOrigin(0)
            this.add.bitmapText(11*8, 23*8, 'ZXSpectrumWhite', 'E', 7).setOrigin(0)

            this.add.bitmapText(13*8, 23*8, 'ZXSpectrumWhite', 'L', 7).setOrigin(0)
            this.add.bitmapText(14*8, 23*8, 'ZXSpectrumWhite', 'O', 7).setOrigin(0)
            this.add.bitmapText(15*8, 23*8, 'ZXSpectrumWhite', 'O', 7).setOrigin(0)
            this.add.bitmapText(16*8, 23*8, 'ZXSpectrumWhite', 'K', 7).setOrigin(0)
            this.add.bitmapText(17*8, 23*8, 'ZXSpectrumWhite', 'I', 7).setOrigin(0)
            this.add.bitmapText(18*8, 23*8, 'ZXSpectrumWhite', 'N', 7).setOrigin(0)
            this.add.bitmapText(19*8, 23*8, 'ZXSpectrumWhite', 'G', 7).setOrigin(0)

            this.add.bitmapText(21*8, 23*8, 'ZXSpectrumWhite', 'F', 7).setOrigin(0)
            this.add.bitmapText(22*8, 23*8, 'ZXSpectrumWhite', 'O', 7).setOrigin(0)
            this.add.bitmapText(23*8, 23*8, 'ZXSpectrumWhite', 'R', 7).setOrigin(0)
        }

        // temporary navigation
        key1 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ONE)
        key2 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.TWO)
        key3 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.THREE)
        key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR)
        key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
        key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)
        keyFORGET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

        // temp menu control
        if(localStorage.getItem('forClue') == null) {
            this.add.rectangle(centerX, centerY, 168, 64, 0x000000).setOrigin(0.5)
            this.add.bitmapText(centerX, centerY, 'ZXSpectrumWhite', '1-6 TO PLAY', 7).setOrigin(0.5)
        }
    }

    update() {
        if(key1.isDown) { this.scene.start('whatScene') }
        if(key2.isDown) { this.scene.start('isItScene') }
        if(key3.isDown) { this.scene.start('thatScene') }
        if(key4.isDown) { this.scene.start('youAreScene') }
        if(key5.isDown) {
            this.tune1.setVolume(0)
            if(this.tune3.volume != 1) { this.tune2.setVolume(1) }
            this.scene.start('lookingScene')
        }
        if(key6.isDown) {
            this.tune2.setVolume(0)
            this.tune3.setVolume(1)
            this.scene.start('forScene')
        }
        if(Phaser.Input.Keyboard.JustDown(keyFORGET)) {
            this.tune1.stop()
            this.tune2.stop()
            this.tune3.stop()
            this.solved.play()
            this.scene.start('mysterySolvedScene')
        }
    }
}
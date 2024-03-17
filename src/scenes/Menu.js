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

        if(localStorage.getItem('forClue') == 'true') {
            console.log('%cITS CUT SCENE TIME', "color: #91aa86")
        }

        // set border color
        document.getElementsByTagName('canvas')[0].style.borderColor = '#FFFFFF'

        // tile config
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
        key4 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FOUR)
        key5 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.FIVE)
        key6 = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SIX)
        keyFORGET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)

        // temp menu control
        this.add.rectangle(centerX, centerY, 168, 64, 0x000000).setOrigin(0.5)

        this.add.bitmapText(centerX, centerY, 'ZXSpectrumWhite', '1-6 TO PLAY', 7).setOrigin(0.5)
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
        if(Phaser.Input.Keyboard.JustDown(keyFORGET)) { this.scene.start('mysterySolvedScene')}
    }
}
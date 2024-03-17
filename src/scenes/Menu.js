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
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        // level select
        this.select = 1
        this.maxSelect = 1
        if(localStorage.getItem('whatClue') == 'true') { this.maxSelect = 2 }
        if(localStorage.getItem('isItClue') == 'true') { this.maxSelect = 3 }
        if(localStorage.getItem('thatClue') == 'true') { this.maxSelect = 4 }
        if(localStorage.getItem('youAreClue') == 'true') { this.maxSelect = 5 }
        if(localStorage.getItem('lookingClue') == 'true') { this.maxSelect = 6 }
        if(localStorage.getItem('forClue') == null) {
            this.selectTile = this.add.sprite(3*8, 3*8, 'select').setOrigin(0, 0)
            this.selectTile.play('flash')
        }

        // forget scene config
        // https://labs.phaser.io/edit.html?src=src\input\dragging\bring%20dragged%20item%20to%20top.js used as reference
        if(localStorage.getItem('forClue') == 'true') {
            this.emptyTile = this.physics.add.sprite(25*8, 23*8, 'empty').setOrigin(0)
            this.selectTile = this.add.sprite(17*8, 27*8, 'select').setOrigin(0, 0)
            this.selectTile.setInteractive({ draggable: true })
        }
        this.input.on('drag', function (pointer, gameObject, dragX, dragY) {
            gameObject.x = dragX;
            gameObject.y = dragY;
        })
    }

    update() {
        // cursor movement
        // position 1: (3, 3)
        // position 2: (12, 10)
        // position 3: (8, 19)
        // position 4: (27, 19)
        // position 5: (18, 28)
        // position 6: (11, 41)
        if(Phaser.Input.Keyboard.JustDown(cursors.down) && localStorage.getItem('forClue') == null) {
            if(this.select < this.maxSelect) {
                this.select++
                this.moveSelect()
            }
        } else if(Phaser.Input.Keyboard.JustDown(cursors.up) && localStorage.getItem('forClue') == null) {
            if(this.select > 1) {
                this.select--
                this.moveSelect()
            }
        }
        if(Phaser.Input.Keyboard.JustDown(keyENTER) && localStorage.getItem('forClue') == null) {
            if(this.select == 1) { this.scene.start('whatScene') }
            if(this.select == 2) { this.scene.start('isItScene') }
            if(this.select == 3) { this.scene.start('thatScene') }
            if(this.select == 4) { this.scene.start('youAreScene') }
            if(this.select == 5) {
                this.tune1.setVolume(0)
                if(this.tune3.volume != 1) { this.tune2.setVolume(1) }
                this.scene.start('lookingScene')
            }
            if(this.select == 6) {
                this.tune2.setVolume(0)
                this.tune3.setVolume(1)
                this.scene.start('forScene')
            }
        }

        // forget drag
        if(this.selectTile.x >= 199 && this.selectTile.x <= 201 && this.selectTile.y >= 183 && this.selectTile.y <= 185) {
            this.tune1.stop()
            this.tune2.stop()
            this.tune3.stop()
            this.solved.play()
            this.scene.start('mysterySolvedScene')
        }

        // debug keys
        if(cursors.shift.isDown && Phaser.Input.Keyboard.JustDown(key1)) { this.scene.start('whatScene') }
        if(cursors.shift.isDown && Phaser.Input.Keyboard.JustDown(key2)) { this.scene.start('isItScene') }
        if(cursors.shift.isDown && Phaser.Input.Keyboard.JustDown(key3)) { this.scene.start('thatScene') }
        if(cursors.shift.isDown && Phaser.Input.Keyboard.JustDown(key4)) { this.scene.start('youAreScene') }
        if(cursors.shift.isDown && Phaser.Input.Keyboard.JustDown(key5)) {
            this.tune1.setVolume(0)
            if(this.tune3.volume != 1) { this.tune2.setVolume(1) }
            this.scene.start('lookingScene')
        }
        if(cursors.shift.isDown && Phaser.Input.Keyboard.JustDown(key6)) {
            this.tune2.setVolume(0)
            this.tune3.setVolume(1)
            this.scene.start('forScene')
        }
        if(cursors.shift.isDown && Phaser.Input.Keyboard.JustDown(keyFORGET)) {
            this.tune1.stop()
            this.tune2.stop()
            this.tune3.stop()
            this.solved.play()
            this.scene.start('mysterySolvedScene')
        }
    }

    // move the the selection cursor.
    // I know there are more elegant ways to do this.
    moveSelect() {
        if(this.select == 1) {
            var posX = 3
            var posY = 3
        } else if(this.select == 2) {
            var posX = 12
            var posY = 10
        } else if(this.select == 3) {
            var posX = 8
            var posY = 19
        } else if(this.select == 4) {
            var posX = 27
            var posY = 19
        } else if(this.select == 5) {
            var posX = 18
            var posY = 28
        } else if(this.select == 6) {
            var posX = 11
            var posY = 41
        }
        this.selectTile.setX(posX*8)
        this.selectTile.setY(posY*8)
    }
}
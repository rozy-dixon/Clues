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
        this.add.bitmapText(centerX, 10*8, 'ZXSpectrum', 'CLUES', 7).setOrigin(0.5, 0)
        this.add.bitmapText(centerX-(8*2), 14*8, 'ZXSpectrum', 'START', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*2), 15*8, 'ZXSpectrum', 'CREDITS', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*2), 16*8, 'ZXSpectrum', 'FORGET', 7).setOrigin(0, 0)
        this.forgetText = this.add.bitmapText(centerX, h-(88+16), 'ZXSpectrum', 'YOU HAVE FORGOTTEN.', 7).setOrigin(0.5, 0).setAlpha(0)
        this.add.bitmapText(centerX, h-88, 'ZXSpectrum', 'R FOR RULES', 7).setOrigin(0.5, 0)

        keyFORGET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.select = 1
        this.maxSelect = 3
        this.selectTile = this.add.sprite(centerX-(8*4), 14*8, 'select').setOrigin(0, 0)
        this.selectTile.play('flash')
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(cursors.down)) {
            if(this.select < this.maxSelect) {
                this.select++
                this.selectTile.setY(this.selectTile.y+8)
            }
        } else if(Phaser.Input.Keyboard.JustDown(cursors.up)) {
            if(this.select > 1) {
                this.select--
                this.selectTile.setY(this.selectTile.y-8)
            }
        }

        if(this.select == 1 && Phaser.Input.Keyboard.JustDown(keyENTER)) {
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
        if(this.select == 2 && Phaser.Input.Keyboard.JustDown(keyENTER)) {
            this.scene.start('creditsScene')
        }
        if(this.select == 3 && Phaser.Input.Keyboard.JustDown(keyENTER)) {
            console.log('%cYOU HAVE FORGOTTEN.', "color: #c088ae")
            localStorage.clear()
            this.forgetText.setAlpha(1)
        }
    }
}
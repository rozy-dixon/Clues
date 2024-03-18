class Credits extends Phaser.Scene {
    constructor() {
        super('creditsScene')
    }

    create() {
        console.log('%cCREDITS SCENE :^)', "color: #cfd1af")    // making sure

        // set background
        const map = this.add.tilemap('menuTilemapJSON')
        const tileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        map.createLayer('Background', tileset, 0, 0)
        map.createLayer('Frame', tileset, 0, 0)

        // title and 
        this.add.bitmapText(centerX, 10*8, 'ZXSpectrum', 'CREDITS', 7).setOrigin(0.5, 0)
        this.add.bitmapText(centerX-(8*8), 14*8, 'ZXSpectrum', 'ROSALIND DIXON', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 15*8, 'ZXSpectrum', '- PROGRAMMING', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 16*8, 'ZXSpectrum', '- DESIGN', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 17*8, 'ZXSpectrum', '- MUSIC', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 18*8, 'ZXSpectrum', '- ASSETS', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 19*8, 'ZXSpectrum', '- MISCELLANEOUS', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 21*8, 'ZXSpectrum', 'LOOTBNDT', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 22*8, 'ZXSpectrum', '- INSPIRATION', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 24*8, 'ZXSpectrum', 'NATHAN ALTICE', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 25*8, 'ZXSpectrum', '- TEACHING GOOD', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 27*8, 'ZXSpectrum', 'JACKSON MCLANE', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*8), 28*8, 'ZXSpectrum', '- WINNING FIRST', 7).setOrigin(0, 0)
        this.add.bitmapText(centerX-(8*2), h-88, 'ZXSpectrum', 'MENU', 7).setOrigin(0, 0)

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.selectTile = this.add.sprite(centerX-(8*4), h-88, 'select').setOrigin(0, 0)
        this.selectTile.play('flash')
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) { this.scene.start('titleScene') }
    }
}
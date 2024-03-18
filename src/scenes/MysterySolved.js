class MysterySolved extends Phaser.Scene {
    constructor() {
        super('mysterySolvedScene')
    }

    create() {
        console.log('%cMYSTERY SOLVED SCENE :^)', "color: #cfd1af") // making sure
 
        this.add.bitmapText(centerX-(8*2), 14*8, 'ZXSpectrumWhite', 'FORGET', 7).setOrigin(0, 0)

        keyENTER = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ENTER)

        this.selectTile = this.add.sprite(centerX-(8*4), 14*8, 'select').setOrigin(0, 0)
        this.selectTile.play('flash')
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyENTER)) {
            console.log('%cYOU HAVE FORGOTTEN.', "color: #c088ae")
            localStorage.clear()
            this.scene.start('titleScene')
        }
    }
}
class MysterySolved extends Phaser.Scene {
    constructor() {
        super('mysterySolvedScene')
    }

    create() {
        console.log('%cMYSTERY SOLVED SCENE :^)', "color: #cfd1af") // making sure

        keyFORGET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
        keyEXIT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)

        this.add.bitmapText(centerX, centerY, 'ZXSpectrumWhite', 'F TO FORGET', 7).setOrigin(0.5)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyEXIT)) { this.scene.start('menuScene') }
        if(Phaser.Input.Keyboard.JustDown(keyFORGET)) {
            console.log('%cYOU HAVE FORGOTTEN.', "color: #c088ae")
            localStorage.clear()
            this.scene.start('titleScene')
        }
    }
}
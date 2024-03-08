class MysterySolved extends Phaser.Scene {
    constructor() {
        super('mysterySolvedScene')
    }

    create() {
        console.log('%cMYSTERY SOLVED SCENE :^)', "color: #cfd1af") // making sure

        keyFORGET = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.F)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyEXIT)) { this.scene.start('menuScene') }
        if(Phaser.Input.Keyboard.JustDown(keyFORGET)) {
            console.log('forgotten')
            //localStorage.clear()
            // creds
        }
    }
}
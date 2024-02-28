class Rules extends Phaser.Scene {
    constructor() {
        super({ key: 'rulesScene', active: true })
    }

    create() {
        console.log('%cRULES SCENE :^)', "color: #cfd1af")  // making sure

        // define cursors, R, and C
        cursors = this.input.keyboard.createCursorKeys()
        keyCREDITS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.C)
        keyRULES = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)
    }

    update() {
        if(Phaser.Input.Keyboard.JustDown(keyRULES)) {
            console.log('RULES:')
        }
    }
}
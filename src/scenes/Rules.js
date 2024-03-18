class Rules extends Phaser.Scene {
    constructor() {
        super({ key: 'rulesScene', active: true })
    }

    preload() {
        this.load.image('rules', './assets/rules.png')
    }

    create() {
        console.log('%cRULES SCENE :^)', "color: #cfd1af")  // making sure

        // define cursors and R
        cursors = this.input.keyboard.createCursorKeys()
        keyRULES = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.R)

        // rules image
        this.rulesImage = this.add.image(0, 0, 'rules').setOrigin(0, 0).setAlpha(0)
    }

    update() {
        // press R to close rules, press E to exit to menu, press C for credits
        if(Phaser.Input.Keyboard.JustDown(keyRULES)) { this.rulesImage.alpha == 1 ? this.rulesImage.setAlpha(0) : this.rulesImage.setAlpha(1) }
    }
}
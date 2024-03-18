class GraderKeys extends Phaser.Scene {
    constructor() {
        super({ key: 'graderKeysScene', active: true })
    }

    preload() {
        this.load.image('graders', './assets/graders.png')
    }

    create() {
        console.log('%cGRADER SCENE :^)', "color: #cfd1af")  // making sure

        // define G
        keyGRADERS = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.G)

        // rules image
        this.gradersImage = this.add.image(0, 0, 'graders').setOrigin(0, 0).setAlpha(0)
    }

    update() {
        // press R to close rules, press E to exit to menu, press C for credits
        if(Phaser.Input.Keyboard.JustDown(keyGRADERS)) { this.gradersImage.alpha == 1 ? this.gradersImage.setAlpha(0) : this.gradersImage.setAlpha(1) }
    }
}
class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        console.log("-> TITLE SCENE :^)")   // making sure
        
        this.scene.start('menuScene')
    }
}
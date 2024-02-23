class Title extends Phaser.Scene {
    constructor() {
        super('titleScene')
    }

    create() {
        console.log("-> TITLE SCENE :^)")   // making sure

        // set background
        const map = this.add.tilemap('menuTilemapJSON')
        const tileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        map.createLayer('Background', tileset, 0, 0)
        map.createLayer('Frame', tileset, 0, 0)

        // define cursors
        cursors = this.input.keyboard.createCursorKeys()

        // title and 
        this.add.bitmapText(centerX, 80, 'rozyPixelFont', 'CLUES', 8).setOrigin(0.5)
        this.add.bitmapText(centerX, 112, 'rozyPixelFont', 'UP FOR START', 8).setOrigin(0.5)
        this.add.bitmapText(centerX, 120, 'rozyPixelFont', 'R FOR RULES', 8).setOrigin(0.5)
        this.add.bitmapText(centerX, 128, 'rozyPixelFont', 'C FOR CREDITS', 8).setOrigin(0.5)
        this.add.bitmapText(centerX, 136, 'rozyPixelFont', 'SHIFT AND DOWN FOR RESET', 8).setOrigin(0.5)

        // checking the font stuff
        this.add.bitmapText(centerX, h-88, 'rozyPixelFont', 'CHECKING MY FONT!', 8).setOrigin(0.5)
        this.add.bitmapText(centerX, h-80, 'rozyPixelFont', 'ABDJLPQRSUVWXZ1234567890!?<>".', 8).setOrigin(0.5)
    }

    update() {
        if(cursors.up.isDown) {
            this.scene.start('menuScene')
        }
        if(cursors.shift.isDown && cursors.left.isDown) {
            localStorage.clear()
        }
    }
}
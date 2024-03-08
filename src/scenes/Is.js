class Is extends Phaser.Scene {
    constructor() {
        super('isScene')
    }

    init() {
        // define variables
        this.ACCELERATION = 800
    }

    create() {
        console.log('%cIS SCENE :^)', "color: #cfd1af") // making sure

        // set border color
        document.getElementsByTagName('canvas')[0].style.borderColor = '#000000'

        this.physics.world.setBounds(0, 0, w, h, true, true, true, true)

        const map = this.add.tilemap('menuTilemapJSON')
        const cluesTileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        const levelTileset = map.addTilesetImage('level_tilesheet', 'levelTilesheetPNG')
        map.createLayer('TutorialBackground', levelTileset, 0, 0)
        const frameLayer = map.createLayer('TutorialFrame', cluesTileset, 0, 0)
        frameLayer.setCollisionByProperty({ collidable: true })

        // player
        this.player = new Player(this, 112, 352)
        this.player.body.setBounce(.4)

        this.physics.add.collider(this.player, frameLayer)
        console.log(this.cameras.main.x)
    }

    update() {
        if(cursors.left.isDown) { this.player.body.setAccelerationX(-this.ACCELERATION) }
        if(cursors.right.isDown) { this.player.body.setAccelerationX(this.ACCELERATION) }
        if(!cursors.left.isDown && !cursors.right.isDown) { this.player.body.setAccelerationX(0) }
        if(cursors.up.isDown) { this.player.body.setAccelerationY(-this.ACCELERATION) }
        if(cursors.down.isDown) { this.player.body.setAccelerationY(this.ACCELERATION) }
        if(!cursors.up.isDown && !cursors.down.isDown) { this.player.body.setAccelerationY(0) }

        // camera movement
        /* if(cursors.left.isDown && this.cameras.main.x > -0.05) { this.cameras.main.rotation -= 0.001 }
        if(cursors.right.isDown && this.cameras.main.x < 0.05) { this.cameras.main.rotation += 0.001 }
        if(!cursors.left.isDown && !cursors.right.isDown && this.cameras.main.x > 0) { this.cameras.main.rotation -= 0.001 }
        if(!cursors.left.isDown && !cursors.right.isDown && this.cameras.main.x < 0) { this.cameras.main.rotation += 0.001 } */
        if(cursors.left.isDown && this.cameras.main.x > -0.1) { this.cameras.main.x -= 0.001 }
        if(cursors.right.isDown && this.cameras.main.x < -0.05) { this.cameras.main.x += 0.001 }
    }
}
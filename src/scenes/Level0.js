class Level0 extends Phaser.Scene {
    constructor() {
        super('level0Scene')
    }

    init() {
        // define variables
        this.ACCELERATION = 3000
        this.MAX_VELOCITY = 1000
        this.DRAG = .05
        this.BOUNCE = .5
        this.SPEED = 4
    }

    create() {
        console.log('%cLEVEL 0 SCENE :^)', "color: #cfd1af")    // making sure

        this.physics.world.setBounds(0, 0, w, h, true, true, true, true)

        // set background
        const map = this.add.tilemap('menuTilemapJSON')
        const tileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        map.createLayer('Background', tileset, 0, 0)
        const frameLayer = map.createLayer('Frame', tileset, 0, 0)

        // player config
        //this.player = new Player(this, centerX, centerY)
        this.player = this.physics.add.sprite(centerX, centerY, 'player', 1).setOrigin(.5)
        this.player.body.setCollideWorldBounds(true)
        this.player.setBounce(this.BOUNCE)
        this.player.body.setCircle(this.player.width/2.5)
        this.player.setMaxVelocity(this.MAX_VELOCITY)
        this.player.setDamping(true)
        this.player.setDrag(this.DRAG)
        this.player.body.onCollide = true
        this.player.body.onOverlap = true
        this.player.anims.play('neutral')

        // collision config
        frameLayer.setCollisionByProperty({ collidable: true })
    }

    update() {
        //if(cursors.down.isDown) { console.log('hello') }
        if(cursors.up.isDown) { this.player.body.setAccelerationY(-this.ACCELERATION) }
        if(cursors.down.isDown) { this.player.body.setAccelerationY(this.ACCELERATION) }
        if(!cursors.up.isDown && !cursors.down.isDown) { this.player.setAccelerationY(0) }
        if(cursors.left.isDown) { this.player.body.setAccelerationX(-this.ACCELERATION) }
        if(cursors.right.isDown) { this.player.body.setAccelerationX(this.ACCELERATION) }
        if(!cursors.left.isDown && !cursors.right.isDown) { this.player.setAccelerationX(0) }
    }
}
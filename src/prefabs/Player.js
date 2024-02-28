class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player')

        // body 
        this.scene.add.existing(this)
        this.scene.physics.add.existing(this)

        this.body.setCircle(this.width/2)
        this.body.onCollide = true
        this.body.onOverlap = true
        this.body.setCollideWorldBounds(true)

        // animations
        this.anims.play('neutral')
    }

    init() {
        this.MAX_VELOCITY = 1000
        this.BOUNCE = .05
        this.DRAG = .5
        this.ACCELERATION = 3000
    }

    update() {
        if(cursors.up.isDown) { console.log('hellloowww') }
        if(cursors.up.isDown) { this.body.setAccelerationY(-this.ACCELERATION) }
        if(cursors.down.isDown) { this.body.setAccelerationY(this.ACCELERATION) }
        if(cursors.left.isDown) { this.body.setAccelerationX(-this.ACCELERATION) }
        if(cursors.right.isDown) { this.body.setAccelerationX(this.ACCELERATION) }
    }
}
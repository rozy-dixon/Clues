class Player extends Phaser.Physics.Arcade.Sprite {
    constructor(scene, x, y) {
        super(scene, x, y, 'player')

        // body
        scene.add.existing(this)
        scene.physics.add.existing(this)

        // physics
        this.body.setCollideWorldBounds(true)
        this.body.setCircle(this.width/2)
        this.body.setBounce(.5)
        this.body.onCollide = true
        this.body.onOverlap = true
        this.body.setMaxVelocity(2000)
        this.body.setDamping(true)
        this.body.setDrag(.03)
    }
}
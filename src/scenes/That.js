class That extends Phaser.Scene {
    constructor() {
        super('thatScene')
    }

    init() {
        // define variables
        this.ACCELERATION = 800
        this.VELOCITY_MULTIPLIER = 12
        this.physics.world.gravity.y = 800
    }

    create() {
        // plan: finding the T spawns a new T

        console.log('%cTHAT SCENE :^)', "color: #cfd1af")   // making sure

        // set border color
        document.getElementsByTagName('canvas')[0].style.borderColor = '#000000'

        this.physics.world.setBounds(0, 0, w, h, true, true, true, true)

        // set background
        const map = this.add.tilemap('menuTilemapJSON')
        const cluesTileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        const levelTileset = map.addTilesetImage('level_tilesheet', 'levelTilesheetPNG')
        map.createLayer('ThatBackground', levelTileset, 0, 0)
        const frameLayer = map.createLayer('ThatFrame', cluesTileset, 0, 0)
        frameLayer.setCollisionByProperty({ collidable: true })

        // player
        this.player = new Player(this, 112, 352)
        
        // colliders
        this.physics.add.collider(this.player, frameLayer)

        // collision config
        this.grounded = true
        this.jumpV = 0

        keyEXIT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)
    }

    update() {
        if(cursors.left.isDown) { this.player.body.setAccelerationX(-this.ACCELERATION) }
        if(cursors.right.isDown) { this.player.body.setAccelerationX(this.ACCELERATION) }
        if(!cursors.left.isDown && !cursors.right.isDown) { this.player.body.setAccelerationX(0) }

        // camera tilt
        if(cursors.left.isDown && this.cameras.main.rotation > -0.05) { this.cameras.main.rotation -= 0.001 }
        if(cursors.left.isDown && this.cameras.main.rotation > 0) { this.cameras.main.rotation -= 0.005 }
        if(cursors.right.isDown && this.cameras.main.rotation < 0.05) { this.cameras.main.rotation += 0.001 }
        if(cursors.right.isDown && this.cameras.main.rotation < 0) { this.cameras.main.rotation += 0.005 }
        if(!cursors.left.isDown && !cursors.right.isDown && this.cameras.main.rotation > 0) { this.cameras.main.rotation -= 0.001 }
        if(!cursors.left.isDown && !cursors.right.isDown && this.cameras.main.rotation < 0) { this.cameras.main.rotation += 0.001 }
        // [ ] tweens?

        // power up jump
        this.grounded = this.player.body.touching.down || this.player.body.blocked.down
        if(this.grounded) {
            this.player.anims.play('jump')
            if(cursors.space.isDown) { 
                this.jumpV--
                // [ ] player shake
                // [ ] particle emit
            }
            if(Phaser.Input.Keyboard.JustUp(cursors.space) || this.jumpV <= -100 ) {
                this.player.body.setVelocityY(this.jumpV*this.VELOCITY_MULTIPLIER)
                this.sound.play('jump')
                this.jumpV = 0
                this.cameras.main.shake(80, 0.005)
            }
        }

        if(Phaser.Input.Keyboard.JustDown(keyEXIT)) { this.scene.start('menuScene') }
    }
}
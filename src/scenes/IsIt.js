class IsIt extends Phaser.Scene {
    constructor() {
        super('isItScene')
    }

    init() {
        // define variables
        this.ACCELERATION = 500
        this.PLAYERX = 23*8
        this.PLAYERY = 18*8
        this.CLUE1X = 13*8
        this.CLUE1Y = 16*8
        this.CLUE2X = 10*8
        this.CLUE2Y = 31*8
        this.VELOCITY_MULTIPLIER = 12
        this.physics.world.gravity.y = 900
    }

    create() {
        console.log('%cISIT SCENE :^)', "color: #cfd1af")   // making sure

        // camera config
        this.level = 'is'
        this.top = this.cameras.add(0, 0, w, centerY)
        this.top.setBounds(0, 0, w, centerY)
        this.bottom = this.cameras.add(0, centerY, w, centerY)
        this.bottom.setBounds(0, centerY, w, centerY)

        // set border color
        document.getElementsByTagName('canvas')[0].style.borderColor = '#000000'

        // set background
        const map = this.add.tilemap('menuTilemapJSON')
        const cluesTileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        const levelTileset = map.addTilesetImage('level_tilesheet', 'levelTilesheetPNG')
        // tilemaps
        map.createLayer('IsItBackground', levelTileset, 0, 0)
        const frameLayer = map.createLayer('IsItFrame', cluesTileset, 0, 0)
        frameLayer.setCollisionByProperty({ collidable: true })
        const checkeredLayer = map.createLayer('IsItCheckers', cluesTileset, 0, 0)
        checkeredLayer.setCollisionByProperty({ collidable: true })
        this.waveLayer = map.createLayer('IsItWaves', cluesTileset, 0, 0)
        this.waveLayer.setCollisionByProperty({ collidable: true })
        map.createLayer('IsItDots', levelTileset, 0, 0)

        // letter collection graphics (tileX*8, tileY*8, w, h, color)
        this.tileIOne = this.physics.add.sprite(28*8, 12*8, 'letter').setOrigin(0) // I 1
        this.letterIOne = this.add.bitmapText(28*8, 12*8, 'ZXSpectrumWhite', 'I', 7).setOrigin(0)
        this.tileIOne.body.onOverlap = true
        this.tileIOne.body.setAllowGravity(false)
        this.collectIOne = false
        this.tileS = this.physics.add.sprite(7*8, 8*8, 'letter').setOrigin(0)  // H
        this.letterS = this.add.bitmapText(7*8, 8*8, 'ZXSpectrumWhite', 'S', 7).setOrigin(0)
        this.tileS.body.onOverlap = true
        this.tileS.body.setAllowGravity(false)
        this.collectS = false
        this.tileITwo = this.physics.add.sprite(23*8, 33*8, 'letter').setOrigin(0)  // 1 2
        this.letterITwo = this.add.bitmapText(23*8, 33*8, 'ZXSpectrumWhite', 'I', 7).setOrigin(0)
        this.tileITwo.body.onOverlap = true
        this.tileITwo.body.setAllowGravity(false)
        this.collectITwo = false
        this.tileT = this.physics.add.sprite(13*8, 42*8, 'letter').setOrigin(0) // T
        this.letterT = this.add.bitmapText(13*8, 42*8, 'ZXSpectrumWhite', 'T', 7).setOrigin(0)
        this.tileT.body.onOverlap = true
        this.tileT.body.setAllowGravity(false)
        this.collectT = false

        // player
        this.player = new Player(this, this.PLAYERX, this.PLAYERY)
        
        // colliders
        this.playerx = 19*8
        this.playery = 47*8
        this.physics.world.setBounds(0, 0, w, h, true, true, true, true)
        this.physics.add.collider(this.player, frameLayer)
        this.physics.add.collider(this.player, checkeredLayer)
        this.physics.add.collider(this.player, this.waveLayer, (player, waveLayer) => {
            // [ ] play death animation
            // screen shake
            this.dieParticles()
            this.cameras.main.shake(100, 0.02)
            // send back to the start
            if (this.level == 'is') {
                player.x = this.PLAYERX
                player.y = this.PLAYERY
            } else {
                player.x = this.playerx
                player.y = this.playery
            }
            // play respawn sound
            this.sound.play('respawn')
            this.respawnParticles()
            player.setVelocity(0)
        }, null, this)

        // jump config
        this.grounded = true
        this.jumpV = 0

        keyEXIT = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)

        this.circle = this.add.circle(centerX, centerY, 0)
    }

    update() {
        // player movement
        if(cursors.left.isDown) { this.player.body.setAccelerationX(-this.ACCELERATION) }
        if(cursors.right.isDown) { this.player.body.setAccelerationX(this.ACCELERATION) }
        if(!cursors.left.isDown && !cursors.right.isDown) { this.player.body.setAccelerationX(0) }

        // camera tilt
        if(this.level == 'is') {
            if(cursors.left.isDown && this.top.rotation > -0.05) { this.top.rotation -= 0.001 }
            if(cursors.left.isDown && this.top.rotation > 0) { this.top.rotation -= 0.005 }
            if(cursors.right.isDown && this.top.rotation < 0.05) { this.top.rotation += 0.001 }
            if(cursors.right.isDown && this.top.rotation < 0) { this.top.rotation += 0.005 }
            if(!cursors.left.isDown && !cursors.right.isDown && this.top.rotation > 0) { this.top.rotation -= 0.001 }
            if(!cursors.left.isDown && !cursors.right.isDown && this.top.rotation < 0) { this.top.rotation += 0.001 }
        } else {
            if(cursors.left.isDown && this.bottom.rotation > -0.05) { this.bottom.rotation -= 0.001 }
            if(cursors.left.isDown && this.bottom.rotation > 0) { this.bottom.rotation -= 0.005 }
            if(cursors.right.isDown && this.bottom.rotation < 0.05) { this.bottom.rotation += 0.001 }
            if(cursors.right.isDown && this.bottom.rotation < 0) { this.bottom.rotation += 0.005 }
            if(!cursors.left.isDown && !cursors.right.isDown && this.bottom.rotation > 0) { this.bottom.rotation -= 0.001 }
            if(!cursors.left.isDown && !cursors.right.isDown && this.bottom.rotation < 0) { this.bottom.rotation += 0.001 }
        }
        // [ ] tweens?

        // power up jump
        this.grounded = this.player.body.touching.down || this.player.body.blocked.down
        if(this.grounded) {
            this.player.anims.play('jump')
            if(Phaser.Input.Keyboard.JustDown(cursors.space)) {
                this.circle.setPosition(this.player.x, this.player.y)
                this.circle.setStrokeStyle(1, 0x000000, 1)
            }
            if(cursors.space.isDown) { 
                this.jumpV -= .8
                this.circle.setRadius(this.jumpV/3)
                this.circle.setPosition(this.player.x, this.player.y)
                // [ ] player shake
            }
            if(Phaser.Input.Keyboard.JustUp(cursors.space) || this.jumpV <= -100 ) {
                this.releaseParticles()
                this.circle.setStrokeStyle(1, 0x000000, 0)
                this.player.body.setVelocityY(this.jumpV*this.VELOCITY_MULTIPLIER)
                this.sound.play('jump')
                this.jumpV = 0
                if(!this.collectIOne && !this.collectS) { this.top.shake(80, 0.005) }
                else { this.bottom.shake(80, 0.005) }
            }
        }

        // collecting letters to spawn clue
        if(this.physics.overlap(this.player, this.tileIOne) && !this.collectIOne) {
            this.collectIOne = true
            this.letterIOne.destroy()
        }
        if(this.physics.overlap(this.player, this.tileS) && !this.collectS) {
            this.collectS = true
            this.letterS.destroy()
        }
        if(this.physics.overlap(this.player, this.tileITwo) && !this.collectITwo) {
            this.collectITwo = true
            this.letterITwo.destroy()
        }
        if(this.physics.overlap(this.player, this.tileT) && !this.collectT) {
            this.collectT = true
            this.letterT.destroy()
        }
        if(this.collectIOne && this.collectS) {
            // [ ] animation
            this.clueOne = this.physics.add.sprite(this.CLUE1X, this.CLUE1Y, 'letter').setOrigin(0)
            this.add.bitmapText(this.CLUE1X, this.CLUE1Y, 'ZXSpectrumWhite', '?', 7).setOrigin(0)
            this.clueOne.body.onOverlap = true
            this.clueOne.body.setAllowGravity(false)
        }
        if(this.physics.overlap(this.player, this.clueOne)) {
            this.level = 'it'
            this.player.x = this.playerx
            this.player.y = this.playery
        }
        if(this.collectITwo && this.collectT) {
            // [ ] animation
            this.clueTwo = this.physics.add.sprite(this.CLUE2X, this.CLUE2Y, 'letter').setOrigin(0)
            this.add.bitmapText(this.CLUE2X, this.CLUE2Y, 'ZXSpectrumWhite', '?', 7).setOrigin(0)
            this.clueTwo.body.onOverlap = true
            this.clueTwo.body.setAllowGravity(false)
        }
        if(this.physics.overlap(this.player, this.clueTwo)) {
            if(localStorage.getItem('isItClue') == null) {
                localStorage.setItem('isItClue', 'true')
                console.log('%cLevel IsIt: 1st completion', "color: #91aa86")
            } else {
                console.log('%cLevel IsIt: already completed', "color: #c088ae")
            }
            this.scene.start('menuScene')
        }

        if(Phaser.Input.Keyboard.JustDown(keyEXIT)) { this.scene.start('menuScene') }
    }

    dieParticles() {
        this.add.particles(this.player.x, this.player.y, '4PParticle', {
            speed: 60,
            lifespan: 300,
            maxParticles: 8
        }).setDepth(100)
        this.add.particles(this.player.x, this.player.y, '9PParticle', {
            speed: 40,
            lifespan: 200,
            maxParticles: 8
        }).setDepth(100)
    }

    releaseParticles() {
        this.add.particles(this.player.x, this.player.y, '1PParticle', {
            speed: 60,
            lifespan: 100,
            maxParticles: 4
        }).setDepth(100)
        this.add.particles(this.player.x, this.player.y, '4PParticle', {
            speed: 80,
            lifespan: 100,
            maxParticles: 8
        }).setDepth(100)
    }

    respawnParticles() {
        this.add.particles(this.player.x, this.player.y, '1PParticle', {
            speed: 80,
            lifespan: 100,
            maxParticles: 10
        }).setDepth(100)
    }
}
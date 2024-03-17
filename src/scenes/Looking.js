class Looking extends Phaser.Scene {
    constructor() {
        super('lookingScene')
    }

    init() {
        // define variables
        this.ACCELERATION = 500
        this.PLAYERX = 30*8
        this.PLAYERY = 4*8
        this.CLUEX = 6*8
        this.CLUEY = 14*8
        this.VELOCITY_MULTIPLIER = 12
        this.physics.world.gravity.y = 1200
    }

    create() {
        // plan: finding the first O spawns a new O
    
        console.log('%cLOOKING SCENE :^)', "color: #cfd1af")    // making sure

        // set border color
        document.getElementsByTagName('canvas')[0].style.borderColor = '#000000'

        // set background
        const map = this.add.tilemap('menuTilemapJSON')
        const cluesTileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        const levelTileset = map.addTilesetImage('level_tilesheet', 'levelTilesheetPNG')
        // tilemaps
        map.createLayer('TutorialBackground', levelTileset, 0, 0)
        const frameLayer = map.createLayer('TutorialFrame', cluesTileset, 0, 0)
        frameLayer.setCollisionByProperty({ collidable: true })
        const checkeredLayer = map.createLayer('LookingCheckers', cluesTileset, 0, 0)
        checkeredLayer.setCollisionByProperty({ collidable: true })
        this.waveLayer = map.createLayer('LookingWaves', cluesTileset, 0, 0)
        this.waveLayer.setCollisionByProperty({ collidable: true })
        //map.createLayer('TutorialDots', levelTileset, 0, 0)

        // letter collection graphics (tileX*8, tileY*8, w, h, color)
        this.tileL = this.physics.add.sprite(15*8, 42*8, 'letter').setOrigin(0) // L
        this.letterL = this.add.bitmapText(15*8, 42*8, 'ZXSpectrumWhite', 'L', 7).setOrigin(0)
        this.tileL.body.onOverlap = true
        this.tileL.body.setAllowGravity(false)
        this.collectL = false
        this.tileOOne = this.physics.add.sprite(18*8, 39*8, 'letter').setOrigin(0)  // O
        this.letterOOne = this.add.bitmapText(18*8, 39*8, 'ZXSpectrumWhite', 'O', 7).setOrigin(0)
        this.tileOOne.body.onOverlap = true
        this.tileOOne.body.setAllowGravity(false)
        this.collectOOne = false
        this.tileOTwo = this.physics.add.sprite(24*8, 18*8, 'letter').setOrigin(0)  // O
        this.letterOTwo = this.add.bitmapText(24*8, 18*8, 'ZXSpectrumWhite', 'O', 7).setOrigin(0)
        this.tileOTwo.body.onOverlap = true
        this.tileOTwo.body.setAllowGravity(false)
        this.collectOTwo = false
        this.tileK = this.physics.add.sprite(19*8, 8*8, 'letter').setOrigin(0) // K
        this.letterK = this.add.bitmapText(19*8, 8*8, 'ZXSpectrumWhite', 'K', 7).setOrigin(0)
        this.tileK.body.onOverlap = true
        this.tileK.body.setAllowGravity(false)
        this.collectK = false
        this.tileI = this.physics.add.sprite(28*8, 7*8, 'letter').setOrigin(0)  // I
        this.letterI = this.add.bitmapText(28*8, 7*8, 'ZXSpectrumWhite', 'I', 7).setOrigin(0)
        this.tileI.body.onOverlap = true
        this.tileI.body.setAllowGravity(false)
        this.collectI = false
        this.tileN = this.physics.add.sprite(29*8, 37*8, 'letter').setOrigin(0)  // N
        this.letterN = this.add.bitmapText(29*8, 37*8, 'ZXSpectrumWhite', 'N', 7).setOrigin(0)
        this.tileN.body.onOverlap = true
        this.tileN.body.setAllowGravity(false)
        this.collectN = false
        this.tileG = this.physics.add.sprite(9*8, 25*8, 'letter').setOrigin(0) // G
        this.letterG = this.add.bitmapText(9*8, 25*8, 'ZXSpectrumWhite', 'G', 7).setOrigin(0)
        this.tileG.body.onOverlap = true
        this.tileG.body.setAllowGravity(false)
        this.collectG = false

        // player
        this.player = new Player(this, this.PLAYERX, this.PLAYERY)
        
        // colliders
        this.physics.world.setBounds(0, 0, w, h, true, true, true, true)
        this.physics.add.collider(this.player, frameLayer)
        this.physics.add.collider(this.player, checkeredLayer)
        this.physics.add.collider(this.player, this.waveLayer, (player, waveLayer) => {
            // [ ] play death animation
            // screen shake
            this.dieParticles()
            this.cameras.main.shake(100, 0.02)
            // send back to the start
            player.x = this.PLAYERX
            player.y = this.PLAYERY
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
                this.cameras.main.shake(80, 0.005)
            }
        }

        // collecting letters to spawn clue
        if(this.physics.overlap(this.player, this.tileL) && !this.collectL) {
            this.collectL = true
            this.letterL.destroy()
        }
        if(this.physics.overlap(this.player, this.tileOOne) && !this.collectOOne) {
            this.collectOOne = true
            this.letterOOne.destroy()
        }
        if(this.physics.overlap(this.player, this.tileOTwo) && !this.collectOTwo) {
            this.collectOTwo = true
            this.letterOTwo.destroy()
        }
        if(this.physics.overlap(this.player, this.tileK) && !this.collectK) {
            this.collectK = true
            this.letterK.destroy()
        }
        if(this.physics.overlap(this.player, this.tileI) && !this.collectI) {
            this.collectI = true
            this.letterI.destroy()
        }
        if(this.physics.overlap(this.player, this.tileN) && !this.collectN) {
            this.collectN = true
            this.letterN.destroy()
        }
        if(this.physics.overlap(this.player, this.tileG) && !this.collectG) {
            this.collectG = true
            this.letterG.destroy()
        }
        if(this.collectL && this.collectOOne && this.collectOTwo && this.collectK && this.collectI && this.collectN && this.collectG) {
            // [ ] animation
            this.clue = this.physics.add.sprite(this.CLUEX, this.CLUEY, 'letter').setOrigin(0)
            this.add.bitmapText(this.CLUEX, this.CLUEY, 'ZXSpectrumWhite', '?', 7).setOrigin(0)
            this.clue.body.onOverlap = true
            this.clue.body.setAllowGravity(false)
        }
        if(this.physics.overlap(this.player, this.clue)) {
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
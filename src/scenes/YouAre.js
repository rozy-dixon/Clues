class YouAre extends Phaser.Scene {
    constructor() {
        super('youAreScene')
    }

    init() {
        // define variables
        this.ACCELERATION = 400
        this.PLAYERX = 17*8
        this.PLAYERY = 23*8
        this.CLUE1X = 25*8
        this.CLUE1Y = 19*8
        this.CLUE2X = 18*8
        this.CLUE2Y = 31*8
        this.VELOCITY_MULTIPLIER = 12
        this.physics.world.gravity.y = 1100
    }

    create() {
        console.log('%cYOU ARE SCENE :^)', "color: #cfd1af")    // making sure

        // camera config
        this.level = 'you'
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
        map.createLayer('YouAreBackground', levelTileset, 0, 0)
        const frameLayer = map.createLayer('YouAreFrame', cluesTileset, 0, 0)
        frameLayer.setCollisionByProperty({ collidable: true })
        const checkeredLayer = map.createLayer('YouAreCheckers', cluesTileset, 0, 0)
        checkeredLayer.setCollisionByProperty({ collidable: true })
        this.waveLayer = map.createLayer('YouAreWaves', cluesTileset, 0, 0)
        this.waveLayer.setCollisionByProperty({ collidable: true })
        this.triangleLayer = map.createLayer('YouAreTriangles', levelTileset, 0, 0)
        this.triangleLayer.setCollisionByProperty({ collidable: true })
        map.createLayer('YouAreDots', levelTileset, 0, 0)

        // letter collection graphics (tileX*8, tileY*8, w, h, color)
        this.tileY = this.physics.add.sprite(24*8, 15*8, 'letter').setOrigin(0) // Y
        this.letterY = this.add.bitmapText(24*8, 15*8, 'ZXSpectrumWhite', 'Y', 7).setOrigin(0)
        this.tileY.body.onOverlap = true
        this.tileY.body.setAllowGravity(false)
        this.collectY = false
        this.tileO = this.physics.add.sprite(9*8, 6*8, 'letter').setOrigin(0)  // O
        this.letterO = this.add.bitmapText(9*8, 6*8, 'ZXSpectrumWhite', 'O', 7).setOrigin(0)
        this.tileO.body.onOverlap = true
        this.tileO.body.setAllowGravity(false)
        this.collectO = false
        this.tileU = this.physics.add.sprite(26*8, 6*8, 'letter').setOrigin(0)  // U
        this.letterU = this.add.bitmapText(26*8, 6*8, 'ZXSpectrumWhite', 'U', 7).setOrigin(0)
        this.tileU.body.onOverlap = true
        this.tileU.body.setAllowGravity(false)
        this.collectU = false
        this.collectClueOne = false
        this.tileA = this.physics.add.sprite(9*8, 45*8, 'letter').setOrigin(0) // A
        this.letterA = this.add.bitmapText(9*8, 45*8, 'ZXSpectrumWhite', 'A', 7).setOrigin(0)
        this.tileA.body.onOverlap = true
        this.tileA.body.setAllowGravity(false)
        this.collectA = false
        this.tileR = this.physics.add.sprite(26*8, 43*8, 'letter').setOrigin(0) // R
        this.letterR = this.add.bitmapText(26*8, 43*8, 'ZXSpectrumWhite', 'R', 7).setOrigin(0)
        this.tileR.body.onOverlap = true
        this.tileR.body.setAllowGravity(false)
        this.collectR = false
        this.tileE = this.physics.add.sprite(13*8, 41*8, 'letter').setOrigin(0) // E
        this.letterE = this.add.bitmapText(13*8, 41*8, 'ZXSpectrumWhite', 'E', 7).setOrigin(0)
        this.tileE.body.onOverlap = true
        this.tileE.body.setAllowGravity(false)
        this.collectE = false

        // player
        this.player = new Player(this, this.PLAYERX, this.PLAYERY)
        
        // colliders
        this.playerx = 17*8
        this.playery = 45*8
        this.physics.world.setBounds(0, 0, w, h, true, true, true, true)
        this.physics.add.collider(this.player, frameLayer)
        this.physics.add.collider(this.player, checkeredLayer)
        this.physics.add.collider(this.player, this.waveLayer, (player, waveLayer) => {
            // screen shake
            this.dieParticles()
            if(this.collectClueOne) { this.bottom.shake(100, 0.02) }
            else { this.top.shake(100, 0.02) }
            // send back to the start
            if (this.level == 'you') {
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
        this.physics.add.collider(this.player, this.triangleLayer, (player, triangleLayer) => {
            // screen shake
            this.dieParticles()
            if(this.collectClueOne) { this.bottom.shake(100, 0.02) }
            else { this.top.shake(100, 0.02) }
            // send back to the start
            if (this.level == 'you') {
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
        if(this.level == 'you') {
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
                this.jumpV -= .6
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
                if(this.collectClueOne) { this.bottom.shake(80, 0.008) }
                else { this.top.shake(80, 0.008) }
            }
        }

        // collecting letters to spawn clue
        if(this.physics.overlap(this.player, this.tileY) && !this.collectY) {
            this.collectY = true
            this.letterY.destroy()
        }
        if(this.physics.overlap(this.player, this.tileO) && !this.collectO) {
            this.collectO = true
            this.letterO.destroy()
        }
        if(this.physics.overlap(this.player, this.tileU) && !this.collectU) {
            this.collectU = true
            this.letterU.destroy()
        }
        if(this.physics.overlap(this.player, this.tileA) && !this.collectA) {
            this.collectA = true
            this.letterA.destroy()
        }
        if(this.physics.overlap(this.player, this.tileR) && !this.collectR) {
            this.collectR = true
            this.letterR.destroy()
        }
        if(this.physics.overlap(this.player, this.tileE) && !this.collectE) {
            this.collectE = true
            this.letterE.destroy()
        }
        if(this.collectY && this.collectO && this.collectU) {
            // [ ] animation
            this.clueOne = this.physics.add.sprite(this.CLUE1X, this.CLUE1Y, 'letter').setOrigin(0)
            this.add.bitmapText(this.CLUE1X, this.CLUE1Y, 'ZXSpectrumWhite', '?', 7).setOrigin(0)
            this.clueOne.body.onOverlap = true
            this.clueOne.body.setAllowGravity(false)
        }
        if(this.physics.overlap(this.player, this.clueOne)) {
            this.level = 'are'
            this.player.x = this.playerx
            this.player.y = this.playery
            this.collectClueOne = true
        }
        if(this.collectA && this.collectR && this.collectE) {
            // [ ] animation
            this.clueTwo = this.physics.add.sprite(this.CLUE2X, this.CLUE2Y, 'letter').setOrigin(0)
            this.add.bitmapText(this.CLUE2X, this.CLUE2Y, 'ZXSpectrumWhite', '?', 7).setOrigin(0)
            this.clueTwo.body.onOverlap = true
            this.clueTwo.body.setAllowGravity(false)
        }
        if(this.physics.overlap(this.player, this.clueTwo)) {
            if(localStorage.getItem('youAreClue') == null) {
                localStorage.setItem('youAreClue', 'true')
                console.log('%cLevel YouAre: 1st completion', "color: #91aa86")
            } else {
                console.log('%cLevel YouAre: already completed', "color: #c088ae")
            }
            this.time.delayedCall(500, () => {
                this.scene.start('menuScene')
            })
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
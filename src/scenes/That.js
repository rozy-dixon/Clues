class That extends Phaser.Scene {
    constructor() {
        super('thatScene')
    }

    init() {
        // define variables
        this.ACCELERATION = 400
        this.PLAYERX = 19*8
        this.PLAYERY = 40*8
        this.CLUEX = 19*8
        this.CLUEY = 18*8
        this.VELOCITY_MULTIPLIER = 12
        this.physics.world.gravity.y = 1000
    }

    create() {
        console.log('%cTHAT SCENE :^)', "color: #cfd1af")   // making sure

        // set border color
        document.getElementsByTagName('canvas')[0].style.borderColor = '#000000'

        // set background
        const map = this.add.tilemap('menuTilemapJSON')
        const cluesTileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        const levelTileset = map.addTilesetImage('level_tilesheet', 'levelTilesheetPNG')
        // tilemaps
        map.createLayer('ThatBackground', levelTileset, 0, 0)
        const frameLayer = map.createLayer('ThatFrame', cluesTileset, 0, 0)
        frameLayer.setCollisionByProperty({ collidable: true })
        const checkeredLayer = map.createLayer('ThatCheckers', cluesTileset, 0, 0)
        checkeredLayer.setCollisionByProperty({ collidable: true })
        this.waveLayer = map.createLayer('ThatWaves', cluesTileset, 0, 0)
        this.waveLayer.setCollisionByProperty({ collidable: true })
        this.triangleLayer = map.createLayer('ThatTriangles', levelTileset, 0, 0)
        this.triangleLayer.setCollisionByProperty({ collidable: true })
        map.createLayer('ThatDots', levelTileset, 0, 0)

        // letter collection graphics (tileX*8, tileY*8, w, h, color)
        this.tileTOne = this.physics.add.sprite(5*8, 16*8, 'letter').setOrigin(0) // T
        this.letterTOne = this.add.bitmapText(5*8, 16*8, 'ZXSpectrumWhite', 'T', 7).setOrigin(0)
        this.tileTOne.body.onOverlap = true
        this.tileTOne.body.setAllowGravity(false)
        this.collectTOne = false
        this.tileH = this.physics.add.sprite(24*8, 35*8, 'letter').setOrigin(0)  // H
        this.letterH = this.add.bitmapText(24*8, 35*8, 'ZXSpectrumWhite', 'H', 7).setOrigin(0)
        this.tileH.body.onOverlap = true
        this.tileH.body.setAllowGravity(false)
        this.collectH = false
        this.tileA = this.physics.add.sprite(17*8, 23*8, 'letter').setOrigin(0)  // A
        this.letterA = this.add.bitmapText(17*8, 23*8, 'ZXSpectrumWhite', 'A', 7).setOrigin(0)
        this.tileA.body.onOverlap = true
        this.tileA.body.setAllowGravity(false)
        this.collectA = false
        this.tileTTwo = this.physics.add.sprite(27*8, 14*8, 'letter').setOrigin(0) // T
        this.letterTTwo = this.add.bitmapText(27*8, 14*8, 'ZXSpectrumWhite', 'T', 7).setOrigin(0)
        this.tileTTwo.body.onOverlap = true
        this.tileTTwo.body.setAllowGravity(false)
        this.collectTTwo = false

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
        this.physics.add.collider(this.player, this.triangleLayer, (player, triangleLayer) => {
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
                this.cameras.main.shake(80, 0.008)
            }
        }

        // collecting letters to spawn clue
        if(this.physics.overlap(this.player, this.tileTOne) && !this.collectTOne) {
            this.collectTOne = true
            this.letterTOne.destroy()
        }
        if(this.physics.overlap(this.player, this.tileH) && !this.collectH) {
            this.collectH = true
            this.letterH.destroy()
        }
        if(this.physics.overlap(this.player, this.tileA) && !this.collectA) {
            this.collectA = true
            this.letterA.destroy()
        }
        if(this.physics.overlap(this.player, this.tileTTwo) && !this.collectTTwo) {
            this.collectTTwo = true
            this.letterTTwo.destroy()
        }
        if(this.collectTOne && this.collectH && this.collectA && this.collectTTwo) {
            // [ ] animation
            this.clue = this.physics.add.sprite(this.CLUEX, this.CLUEY, 'letter').setOrigin(0)
            this.add.bitmapText(this.CLUEX, this.CLUEY, 'ZXSpectrumWhite', '?', 7).setOrigin(0)
            this.clue.body.onOverlap = true
            this.clue.body.setAllowGravity(false)
        }
        if(this.physics.overlap(this.player, this.clue)) {
            if(localStorage.getItem('thatClue') == null) {
                localStorage.setItem('thatClue', 'true')
                console.log('%cLevel That: 1st completion', "color: #91aa86")
            } else {
                console.log('%cLevel That: already completed', "color: #c088ae")
            }
            this.time.delayedCall(200, () => {
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
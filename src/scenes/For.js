class For extends Phaser.Scene {
    constructor() {
        super('forScene')
    }

    init() {
        // define variables
        this.ACCELERATION = 400
        this.PLAYERX = 15*8
        this.PLAYERY = 24*8
        this.CLUEX = 30*8
        this.CLUEY = 40*8
        this.VELOCITY_MULTIPLIER = 12
        this.physics.world.gravity.y = 1300
    }

    create() {
        console.log('%cFOR SCENE :^)', "color: #cfd1af")   // making sure

        // set border color
        document.getElementsByTagName('canvas')[0].style.borderColor = '#000000'

        // set background
        const map = this.add.tilemap('menuTilemapJSON')
        const cluesTileset = map.addTilesetImage('clues_tilesheet', 'cluesTilesheetPNG')
        const levelTileset = map.addTilesetImage('level_tilesheet', 'levelTilesheetPNG')
        // tilemaps
        map.createLayer('ForBackground', levelTileset, 0, 0)
        const frameLayer = map.createLayer('ForFrame', cluesTileset, 0, 0)
        frameLayer.setCollisionByProperty({ collidable: true })
        const checkeredLayer = map.createLayer('ForCheckers', cluesTileset, 0, 0)
        checkeredLayer.setCollisionByProperty({ collidable: true })
        this.waveLayer = map.createLayer('ForWaves', cluesTileset, 0, 0)
        this.waveLayer.setCollisionByProperty({ collidable: true })
        map.createLayer('TutorialDots', levelTileset, 0, 0)
        this.glitchLayer = map.createLayer('ForGlitch', levelTileset, 0, 0)
        this.glitchLayer.setCollisionByProperty({ collidable: true })

        // letter collection graphics (tileX*8, tileY*8, w, h, color)
        this.tileF = this.physics.add.sprite(25*8, 13*8, 'letter').setOrigin(0) // F
        this.letterF = this.add.bitmapText(25*8, 13*8, 'ZXSpectrumWhite', 'F', 7).setOrigin(0)
        this.tileF.body.onOverlap = true
        this.tileF.body.setAllowGravity(false)
        this.collectF = false
        this.tileO = this.physics.add.sprite(4*8, 30*8, 'letter').setOrigin(0)  // O
        this.letterO = this.add.bitmapText(4*8, 30*8, 'ZXSpectrumWhite', 'O', 7).setOrigin(0)
        this.tileO.body.onOverlap = true
        this.tileO.body.setAllowGravity(false)
        this.collectO = false
        this.tileR = this.physics.add.sprite(31*8, 25*8, 'letter').setOrigin(0)  // R
        this.letterR = this.add.bitmapText(31*8, 25*8, 'ZXSpectrumWhite', 'R', 7).setOrigin(0)
        this.tileR.body.onOverlap = true
        this.tileR.body.setAllowGravity(false)
        this.collectR = false

        // player
        this.player = new Player(this, this.PLAYERX, this.PLAYERY)
        
        // colliders
        this.physics.world.setBounds(0, 0, w, h, true, true, true, true)
        this.physics.add.collider(this.player, frameLayer)
        this.physics.add.collider(this.player, checkeredLayer)
        this.glitchCollide = this.physics.add.collider(this.player, this.glitchLayer, (player, glitchLayer) => {
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
                this.cameras.main.shake(80, 0.005)
            }
        }

        // collecting letters to spawn clue
        if(this.physics.overlap(this.player, this.tileF) && !this.collectF) {
            this.collectF = true
            this.letterF.destroy()
        }
        if(this.physics.overlap(this.player, this.tileO) && !this.collectO) {
            this.collectO = true
            this.letterO.destroy()
        }
        if(this.physics.overlap(this.player, this.tileR) && !this.collectR) {
            this.collectR = true
            this.letterR.destroy()
        }
        if(this.collectF && this.collectO && this.collectR) {
            // [ ] animation
            this.glitchLayer.setX(1000) // I know that this may not be the most elegant way to do this, but it works.
            this.clue = this.physics.add.sprite(this.CLUEX, this.CLUEY, 'letter').setOrigin(0)
            this.add.bitmapText(this.CLUEX, this.CLUEY, 'ZXSpectrumWhite', '?', 7).setOrigin(0)
            this.clue.body.onOverlap = true
            this.clue.body.setAllowGravity(false)
        }
        if(this.physics.overlap(this.player, this.clue)) {  // GAME OVER
            if(localStorage.getItem('forClue') == null) {
                localStorage.setItem('forClue', 'true')
                console.log('%cLevel For: 1st completion', "color: #91aa86")
            } else {
                console.log('%cLevel For: already completed', "color: #c088ae")
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
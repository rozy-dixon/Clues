// name: Rosalind Dixon
// title: Clues
// creative tilt:
// - overlapping scenes? kinda coool
// - made another font?

'use strict'

let config = {
    parent: 'clues',
    type: Phaser.AUTO,
    render: {
        pixelArt: true
    },
    width: 592/2,
    height: 832/2,
    scale: {
        autoCenter: Phaser.Scale.CENTER_BOTH,
    },
    physics: {
        default: 'arcade',
        arcade: {
            //debug: true
        }
    },
    zoom: 2,
    scene: [ Load, Title, Menu, Level0, Rules ]
}

const game = new Phaser.Game(config)

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height
let cursors, keyRULES, keyCREDITS
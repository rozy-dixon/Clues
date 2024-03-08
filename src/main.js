// name: Rosalind Dixon
// title: Clues
// creative tilt:

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
            //debug: true,
            gravity: {
                x: 0,
                y: 0
            }
        }
    },
    zoom: 2,
    scene: [ Load, Title, Menu, What, Is, It, Rules ],
}

const game = new Phaser.Game(config)
const tileSize = 8

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height
let cursors, keyCREDITS, keyEXIT, keyRULES
let key1, key2, key3
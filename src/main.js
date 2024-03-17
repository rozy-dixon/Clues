// name: Rosalind Dixon
// title: Clues
// major components:
// - tilemaps
// - text objects
// - animation
// - physics systems
// - cameras
// - particle effects
// creative tilt:
// 

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
    scene: [ Load, Title, Menu, What, IsIt, That, YouAre, Looking, For, Rules, MysterySolved ],
}

const game = new Phaser.Game(config)
const tileSize = 8

let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height
let cursors, keyCREDITS, keyEXIT, keyRULES, keyFORGET
let key1, key2, key3, key4, key5, key6, key7, key8
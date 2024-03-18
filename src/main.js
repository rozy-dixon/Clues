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

// making it easy for myself
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
    scene: [ Load, Title, Credits, Menu, What, IsIt, That, YouAre, Looking, For, MysterySolved, Rules, GraderKeys ]
}

// variable set-up
const game = new Phaser.Game(config)
// convenience variables
let centerX = game.config.width/2
let centerY = game.config.height/2
let w = game.config.width
let h = game.config.height
// cursors and keys
let cursors, keyCREDITS, keyEXIT, keyRULES, keyFORGET, keyENTER, keyGRADERS
let key1, key2, key3, key4, key5, key6, key7, key8
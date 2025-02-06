// public/classes/Player.js
import GameObject from "./GameObject.js";

export default class Player extends GameObject {
    constructor(game,x, y, width, height, color) {
        super(x, y, width, height, color, 'player');
        this.speed = 3;
        this.health = 100;
        this.inventory = [];
        this.invSize = 10;
        this.gold = 0;
        this.level = 1;
        this.exp = 0;
        this.expToNextLevel = 100;
        this.maxHealth = 100;
        this.game = game;
    }

    move(keys) {

        let level = this.game.levels[this.game.currentLevelIndex]

        if (keys['ArrowUp'] || keys['w']) {

            if ( level. map_data[this.y - this.speed  ] [ this.x ]===false) {
                this.y -= this.speed;
            }
        }
        if (keys['ArrowDown'] || keys['s']) {
            if ( level. map_data[this.y + this.speed  ] [ this.x ]===false) {
                this.y += this.speed;
            }

        }
        if (keys['ArrowLeft'] || keys['a']) {
            if ( level. map_data[this.y] [ this.x - this.speed ]===false) {
                this.x -= this.speed;
            }

        }
        if (keys['ArrowRight'] || keys['d']) {
            if ( level. map_data[this.y  ] [ this.x + this.speed ]===false) {
                this.x += this.speed;
            }

        }
        if (keys[' ']) {
            level.objects.forEach(element => {})
        }

    }
}

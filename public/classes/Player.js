// public/classes/Player.js
import GameObject from "./GameObject.js";

export default class Player extends GameObject {
    constructor(x, y, width, height, color) {
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
    }

    move(keys) {


        if (keys['ArrowUp'] || keys['w']) {
            this.y -= this.speed;
        }
        if (keys['ArrowDown'] || keys['s']) {
            this.y += this.speed;
        }
        if (keys['ArrowLeft'] || keys['a']) {
            this.x -= this.speed;
        }
        if (keys['ArrowRight'] || keys['d']) {
            this.x += this.speed;
        }

    }
}

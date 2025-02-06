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

        switch (keys){
            case 'ArrowUp':
            case 'w'  :
                this.y -= this.speed;
                break;
            case 'ArrowDown':
            case 's':
                this.y += this.speed;
                break;
            case 'ArrowLeft':
            case 'a'  :
                this.x -= this.speed;
                break;
            case 'ArrowRight':
            case 'd'  :
                this.x += this.speed;
                break;

            case 'space':

                break;

        }


    }
}

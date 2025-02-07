// public/classes/Player.js
import GameObject from "./GameObject.js";

export default class Player extends GameObject {
    constructor(game, x, y, width, height, color) {
        super(game, x, y, width, height, color, 'player');
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
        this.preloadedImages = this.game.preloadedImages;
        this.frame = 0;
        this.frameCount = 0;
        this.frameSpeed = 4;
        this.currentAnimType = "idle";
        this.isMoving = false;
        this.isAttacking = false; //Angriffsmodus
    }

    move(keys) {
        const level = this.game.levels[this.game.currentLevelIndex];
        let moving = false;

        // Bewegungstasten
        if (keys['ArrowUp'] || keys['w']) {
            if (level.map_data[this.y - this.speed][this.x] === false) {
                this.y -= this.speed;
                moving = true;
            }
        }
        if (keys['ArrowDown'] || keys['s']) {
            if (level.map_data[this.y + this.speed][this.x] === false) {
                this.y += this.speed;
                moving = true;
            }
        }
        if (keys['ArrowLeft'] || keys['a']) {
            if (level.map_data[this.y][this.x - this.speed] === false) {
                this.x -= this.speed;
                moving = true;
            }
        }
        if (keys['ArrowRight'] || keys['d']) {
            if (level.map_data[this.y][this.x + this.speed] === false) {
                this.x += this.speed;
                moving = true;
            }
        }

        // Nur auslösen, wenn der Spieler nicht bereits im Angriffsmodus ist
        if (keys[' '] && !this.isAttacking) {
            this.isAttacking = true;
            // Setze den Animationsmodus auf "slashing"
            this.currentAnimType = "slashing";
            this.frame = 0;
            this.frameCount = 0;


        }

        // Wenn nicht angreifen, setze den Bewegungsstatus (wird im draw() verwendet)
        if (!this.isAttacking) {
            this.isMoving = moving;
        }
    }

    draw(ctx) {
        // Wenn der Spieler angreift, nutzen wir "slashing", ansonsten "walking" oder "idle"
        let animType;
        let frameSpeed;

        if (this.isAttacking) {
            animType = "slashing";
            // Berechne attackFrameSpeed: Gesamtzeit 1,5s bei ca. 100ms pro draw-Aufruf → ca. 15 Aufrufe
            const numAttackFrames = this.preloadedImages["player"]["slashing"].length;
            frameSpeed = Math.max(1, Math.floor(15 / numAttackFrames));
        } else {
            animType = this.isMoving ? "walking" : "idle";
            frameSpeed = this.frameSpeed;
        }

        // Wechsle Animationsmodus, falls nötig
        if (this.currentAnimType !== animType) {
            this.frame = 0;
            this.frameCount = 0;
            this.currentAnimType = animType;
        }

        const frames = this.preloadedImages["player"][animType];

        // Falls der Frame-Index außerhalb des Arrays liegt, zurücksetzen
        if (this.frame >= frames.length) {
            this.frame = frames.length - 1;
        }

        // Frame-Zähler erhöhen
        this.frameCount++;
        if (this.frameCount >= frameSpeed) {
            this.frameCount = 0;
            this.frame++;
            // Falls im Angriffsmodus (slashing) und Animation zu Ende ist, beende den Angriffsmodus
            if (animType === "slashing" && this.frame >= frames.length) {
                this.isAttacking = false;
                this.frame = 0;
                // Falls der Spieler während des Angriffs nicht mehr in Bewegung ist, wechsle zu idle, sonst walking
                this.currentAnimType = this.isMoving ? "walking" : "idle";
            } else if (animType !== "slashing") {
                // Bei idle/walking Schleife: zyklischer Wechsel der Frames
                this.frame = this.frame % frames.length;
            }
        }

        ctx.drawImage(
            frames[this.frame],
            0, 0, 900, 900, // Quellrechteck (anpassen, falls nötig)
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width + 10,
            this.height + 10
        );
    }
}

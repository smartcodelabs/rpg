// public/classes/Enemy.js
import GameObject from "./GameObject.js";

export default class Enemy extends GameObject {
    constructor(game, x, y, width, height, color, level = 1) {
        super(game, x, y, width, height, color, 'enemy');

        // Speichere einen Wanderwinkel, der gelegentlich geändert wird, um ruckartige Richtungswechsel zu vermeiden
        this.wanderAngle = Math.random() * Math.PI * 2;
        this.level = level;  // Gegner Level

        // Basiswerte
        this.speed = 1;
        const baseHealth = 100;
        const baseGold = 10;
        const healthGrowthFactor = 1.2;  // Gesundheit steigt um 20% pro Level
        const goldGrowthFactor = 1.1;    // Gold drop steigt um 10% pro Level (noch nicht implementiert)

        // Exponentielles Wachstum in Abhängigkeit vom Level
        this.health = baseHealth * Math.pow(healthGrowthFactor, this.level - 1);
        this.maxHealth = this.health;
        this.gold = baseGold * Math.pow(goldGrowthFactor, this.level - 1);

        this.game = game;
        this.preloadedImages = this.game.preloadedImages;
    }

    /**
     * Aktualisiert die Position des Gegners.
     * @param {GameObject} player - Das Spielerobjekt, um die Entfernung zu bestimmen.
     * @QUELLE berechnung CHAT GPT rest selbst
     */
    update(player, colision = false) {
        // Greife auf das aktuelle Level und die Map-Daten zu
        const level = this.game.levels[this.game.currentLevelIndex];

        // Hilfsfunktion, um zu prüfen, ob an der Zielposition ein freier Bereich vorliegt
        function canMove(newX, newY) {
            // Runde die Koordinaten ab, um den passenden Index im map_data-Array zu erhalten
            const tileX = Math.floor(newX);
            const tileY = Math.floor(newY);

            // Stelle sicher, dass die Indizes innerhalb der Map liegen
            if (tileY < 0 || tileY >= level.map_data.length) return false;
            if (tileX < 0 || tileX >= level.map_data[tileY].length) return false;

            // Ein Wert von false bedeutet, dass der Bereich frei ist
            return level.map_data[tileY][tileX] === false;
        }

        // Berechne den Vektor vom Gegner zum Spieler
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.hypot(dx, dy);

        // Wenn der Spieler innerhalb von 200 Pixeln ist und keine Kollision vorliegt, soll der Gegner den Spieler verfolgen
        if (distance < 200 && !colision) {
            // Bestimme den Winkel in Richtung des Spielers
            const angle = Math.atan2(dy, dx);

            // Wenn der Gegner nicht zu nahe ist, bewege ihn in Richtung des Spielers
            if (distance > 31) {
                const newX = this.x + Math.cos(angle) * this.speed;
                const newY = this.y + Math.sin(angle) * this.speed;

                // Prüfe, ob der Gegner an der neuen Position hinziehen darf
                if (canMove(newX, newY)) {
                    this.x = newX;
                    this.y = newY;
                }
            }
        } else {
            // Andernfalls: Sanftes Wandern
            // Ändere gelegentlich den Wanderwinkel oder bei Kollisionen
            if (Math.random() < 0.01 || colision === true) {
                this.wanderAngle = Math.random() * Math.PI * 2;
            }
            const newX = this.x + Math.cos(this.wanderAngle) * this.speed * 0.5;
            const newY = this.y + Math.sin(this.wanderAngle) * this.speed * 0.5;

            // Auch hier zuerst prüfen, ob die neue Position frei ist
            if (canMove(newX, newY)) {
                this.x = newX;
                this.y = newY;
            }
        }
    }


    draw(ctx) {

        ctx.drawImage(this.preloadedImages["enemy"][0], this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);

        // Lebensbalken
        const barWidth = this.width;
        const barHeight = 6;
        const padding = 5;
        const barX = this.x - barWidth / 2;
        const barY = this.y - this.height / 2 - barHeight - padding;


        ctx.fillStyle = "red";
        ctx.fillRect(barX, barY, barWidth, barHeight);


        const healthRatio = this.health / this.maxHealth;
        ctx.fillStyle = "green";
        ctx.fillRect(barX, barY, barWidth * healthRatio, barHeight);
        ctx.strokeStyle = "black";
        ctx.strokeRect(barX, barY, barWidth, barHeight);

        // Prüfe ob der Spieler näher als 100 Pixel entfernt ist
        if (this.game.player) {
            const dx = this.x - this.game.player.x;
            const dy = this.y - this.game.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                ctx.font = "8px Arial";
                ctx.fillStyle = "black";
                ctx.textAlign = "right";
                ctx.textBaseline = "middle";
                ctx.fillText("Lv " + this.level, barX - 5, barY + barHeight / 2);


                ctx.font = "7px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(Math.floor(this.health) + " / " + Math.floor(this.maxHealth), barX + barWidth / 2, barY + barHeight / 2);
            }
        }
    }

    takeDamage(damage) {
        if (this.health - damage <= 0) {
            this.game.currentLevel.objects.splice(this.game.currentLevel.objects.indexOf(this), 1);
            this.game.currentLevel.objects.push(new GameObject(this.game, this.x, this.y, this.width, this.height, 'img:/items/apple.png', 'item:apple'));
            this.game.player.exp += this.level * 10;
            this.game.ui.addMessage("Enemy is dead! Apple is dropped at (" + Number.parseInt(this.x) + ", " + Number.parseInt(this.y) + ")");
        }
        this.health -= damage;

    }

}

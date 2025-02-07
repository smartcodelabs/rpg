// public/classes/Enemy.js
import GameObject from "./GameObject.js";

export default class Enemy extends GameObject {
    constructor(game, x, y, width, height, color, level = 1) {
        super(game, x, y, width, height, color, 'enemy');
        this.speed = 1;
        // Speichere einen Wanderwinkel, der gelegentlich geändert wird, um ruckartige Richtungswechsel zu vermeiden
        this.wanderAngle = Math.random() * Math.PI * 2;
        this.level = level;  // Level kann als Parameter übergeben werden, default: 1

        // Basiswerte
        const baseHealth = 100;
        const baseGold = 10;
        // Wachstumsfaktoren (anpassbar)
        const healthGrowthFactor = 1.2;  // Beispiel: Gesundheit steigt um 20% pro Level
        const goldGrowthFactor = 1.1;    // Beispiel: Gold steigt um 10% pro Level

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
     * @QUELLE CHAT GPT
     */
    update(player,colision = false) {
        // Berechne den Vektor vom Gegner zum Spieler
        const dx = player.x - this.x;
        const dy = player.y - this.y;
        const distance = Math.hypot(dx, dy);

        // Wenn der Spieler innerhalb von 20 Pixeln ist, Verfolgung aufnehmen
        if (distance < 200 && !colision ) {
            // Bestimme den Winkel in Richtung des Spielers
            const angle = Math.atan2(dy, dx);
            // Bewege den Gegner in diese Richtung (sofern die update-Funktion z.B. alle 100ms aufgerufen wird, sorgt das für eine flüssige Bewegung)
            if (distance > 31) {
                this.x += Math.cos(angle) * this.speed;
                this.y += Math.sin(angle) * this.speed;
            }
        } else {
            // Andernfalls: Sanftes Wandern
            // Ändere gelegentlich den Wanderwinkel, um die Richtung nicht konstant zu halten
            if (Math.random() < 0.01 || colision === true ) { // 5% Chance pro Aufruf, den Winkel zu ändern
                this.wanderAngle = Math.random() * Math.PI * 2;
            }
            // Bewege den Gegner in der Wanderungsrichtung mit reduzierter Geschwindigkeit
            this.x += Math.cos(this.wanderAngle) * this.speed * 0.5;
            this.y += Math.sin(this.wanderAngle) * this.speed * 0.5;
        }
    }

    draw(ctx) {
        // Zeichne das Gegnerbild
        ctx.drawImage(
            this.preloadedImages["enemy"][0],
            this.x - this.width / 2,
            this.y - this.height / 2,
            this.width,
            this.height
        );

        // Parameter für den Lebensbalken
        const barWidth = this.width;   // Breite des Balkens (angepasst an die Gegnerbreite)
        const barHeight = 6;           // Höhe des Balkens
        const padding = 5;             // Abstand zwischen Gegnerbild und Balken
        const barX = this.x - barWidth / 2;
        const barY = this.y - this.height / 2 - barHeight - padding;

        // Zeichne den Hintergrund des Lebensbalkens (roter Balken als "leere" Gesundheit)
        ctx.fillStyle = "red";
        ctx.fillRect(barX, barY, barWidth, barHeight);

        // Berechne das Verhältnis von aktueller Gesundheit zu maximaler Gesundheit
        const healthRatio = this.health / this.maxHealth;

        // Zeichne den gefüllten Teil des Lebensbalkens (grün)
        ctx.fillStyle = "green";
        ctx.fillRect(barX, barY, barWidth * healthRatio, barHeight);

        // Zeichne einen schwarzen Rahmen um den Balken
        ctx.strokeStyle = "black";
        ctx.strokeRect(barX, barY, barWidth, barHeight);

        // Prüfe, ob der Spieler existiert und ob er näher als 100 Pixel entfernt ist
        if (this.game.player) {
            const dx = this.x - this.game.player.x;
            const dy = this.y - this.game.player.y;
            const distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 100) {
                // Zeichne den Level-Text links vom Lebensbalken (schmalere Schrift)
                ctx.font = "8px Arial";  // etwas kleinere Schrift als vorher
                ctx.fillStyle = "black";
                ctx.textAlign = "right";
                ctx.textBaseline = "middle";
                ctx.fillText("Lv " + this.level, barX - 5, barY + barHeight / 2);

                // Zeichne den Text mit den Lebenspunkten in der Mitte des Balkens (noch kleinere Schrift)
                ctx.font = "7px Arial";
                ctx.fillStyle = "white";
                ctx.textAlign = "center";
                ctx.textBaseline = "middle";
                ctx.fillText(
                    Math.floor(this.health) + " / " + Math.floor(this.maxHealth),
                    barX + barWidth / 2,
                    barY + barHeight / 2
                );
            }
        }
    }


}

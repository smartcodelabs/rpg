// public/classes/Enemy.js
import GameObject from "./GameObject.js";

export default class Enemy extends GameObject {
    constructor(x, y, width, height, color) {
        super(x, y, width, height, color, 'enemy');
        this.speed = 1;
        // Speichere einen wanderwinkel, der gelegentlich geändert wird, um ruckartige Richtungswechsel zu vermeiden
        this.wanderAngle = Math.random() * Math.PI * 2;
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
}

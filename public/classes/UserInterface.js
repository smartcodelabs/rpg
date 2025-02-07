// public/classes/UserInterface.js
export default class UserInterface {

    constructor( ctx,player) {
        this.player = player;
        this.ctx = ctx;
        this.uiArea = { x: 0, y: 0, width: 1024, height: 50 };
    }

    draw(ctx) {
        this.ctx.clearRect(this.uiArea.x, this.uiArea.y, this.uiArea.width, this.uiArea.height);

        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(this.uiArea.x, this.uiArea.y, this.uiArea.width, this.uiArea.height);

        const lifeBarX = 10;
        const lifeBarY = 10;
        const lifeBarWidth = 200;
        const lifeBarHeight = 15;

        //Rahmen
        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(lifeBarX, lifeBarY, lifeBarWidth, lifeBarHeight);

        const lifeFillWidth = (this.player.health / this.player.maxHealth) * lifeBarWidth;
        this.ctx.fillStyle = 'red';
        this.ctx.fillRect(lifeBarX, lifeBarY, lifeFillWidth, lifeBarHeight);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(`${this.player.health} / ${this.player.maxHealth}`, lifeBarX + lifeBarWidth / 2, lifeBarY + lifeBarHeight / 2);

        const expBarX = 10;
        const expBarY = 30;
        const expBarWidth = 200;
        const expBarHeight = 10;

        this.ctx.strokeStyle = 'white';
        this.ctx.strokeRect(expBarX, expBarY, expBarWidth, expBarHeight);

        const expFillWidth = (this.player.exp / this.player.expToNextLevel) * expBarWidth;
        this.ctx.fillStyle = 'blue';
        this.ctx.fillRect(expBarX, expBarY, expFillWidth, expBarHeight);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '10px sans-serif';
        this.ctx.textAlign = 'center';
        this.ctx.textBaseline = 'middle';
        this.ctx.fillText(`${this.player.exp} / ${this.player.expToNextLevel}`, expBarX + expBarWidth / 2, expBarY + expBarHeight / 2);


        this.ctx.fillStyle = 'white';
        this.ctx.font = '16px sans-serif';
        this.ctx.textAlign = 'left';
        // Silber und Goldschlüssel
        this.ctx.fillText(`🔑 Silber: ${this.player.inventory.silverKeys}`, 220, 20);
        this.ctx.fillText(`🔑 Gold: ${this.player.inventory.goldKeys}`, 220, 40);
        // Tränke-Anzeige
        const appleCount = this.player.inventory.filter(item => item.type === "item:apple").length;
        this.ctx.fillText(`🍎 Äpfel: ${appleCount}`, 450, 20); // 790,30 liegt im UI-Bereich (x0, y50 reserviert)

        const potionCount = this.player.inventory.filter(item => item.type === "item:potion").length;

        this.ctx.fillText(`🧪 Tränke: ${potionCount}`, 450, 40);
    }
}

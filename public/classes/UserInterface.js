export default class UserInterface {
    constructor(ctx, player) {
        this.player = player;
        this.ctx = ctx;
        this.uiArea = {x: 0, y: 0, width: 1024, height: 50};
        this.messageArea = {x: 700, y: 0, width: 324, height: 50};
        this.messages = [];
    }

    draw(ctx) {
        this.ctx.clearRect(this.uiArea.x, this.uiArea.y, this.uiArea.width, this.uiArea.height);
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.5)';
        this.ctx.fillRect(this.uiArea.x, this.uiArea.y, this.uiArea.width, this.uiArea.height);

        const lifeBarX = 10;
        const lifeBarY = 10;
        const lifeBarWidth = 200;
        const lifeBarHeight = 15;
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
        let silverKeysCount = this.player.inventory.filter(item => item.type === "item:key_silver").reduce((acc, item) => acc + (item.stack || 1), 0);
        let goldKeysCount = this.player.inventory.filter(item => item.type === "item:key_gold").reduce((acc, item) => acc + (item.stack || 1), 0);
        this.ctx.fillText(`🔑 Silber: ${silverKeysCount}`, 220, 20);
        this.ctx.fillText(`🔑 Gold: ${goldKeysCount}`, 220, 40);
        let appleCount = this.player.inventory.filter(item => item.type === "item:apple").reduce((acc, item) => acc + (item.stack || 1), 0);
        this.ctx.fillText(`🍎 Äpfel: ${appleCount}`, 450, 20);
        let potionCount = this.player.inventory.filter(item => item.type === "item:potion").reduce((acc, item) => acc + (item.stack || 1), 0);
        this.ctx.fillText(`🧪 Tränke: ${potionCount}`, 450, 40);

        this.ctx.fillStyle = 'white';
        this.ctx.font = '12px sans-serif';
        this.ctx.textAlign = 'left';
        let lineHeight = 14;
        let messageY = this.messageArea.y + 10;
        for (let i = 0; i < this.messages.length; i++) {
            this.ctx.fillText(this.messages[i], this.messageArea.x + 10, messageY);
            messageY += lineHeight;
        }
    }

    addMessage(msg) {
        this.messages.push(msg);
        if (this.messages.length > 3) {
            this.messages.shift();
        }
    }
}

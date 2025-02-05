// public/classes/Level.js
export default class Level {
    constructor(id, backgroundImageSrc, playerStart, enemyStart, objects ) {
        this.id = id;
        this.backgroundImage = new Image();
        this.backgroundImage.src = `levels/${backgroundImageSrc}`; // Hintergrundbild des Levels
        this.playerStart = playerStart;
        this.enemyStart = enemyStart;
        this.objects = objects;
    }

    drawBackground(ctx, canvas) {
        ctx.drawImage(this.backgroundImage, 0, 50, canvas.width, canvas.height);
    }

    removeObject(object) {
        this.objects.splice(this.objects.indexOf(object), 1);
    }

}

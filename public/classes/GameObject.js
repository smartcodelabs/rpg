// public/classes/GameObject.js
export default class GameObject {
    constructor(x, y, width, height, color, type = 'object') {
        this.x = x;
        this.y = y+50;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
    }

    draw(ctx) {
        if (this.color.startsWith('img:')) {
            const imgSrc = this.color.replace('img:', ''); // Entfernt 'img:' vom String
            const img = new Image();
            img.src = imgSrc;
            ctx.drawImage(img, this.x, this.y, this.width, this.height);
            img.onload = () => {

            };
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }


    isColliding(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }
}

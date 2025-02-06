import Game from "./Game.js";

export default class GameObject {
    constructor(x, y, width, height, color, type = 'object') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        this.frame = 0;
        this.game = new Game();
        this.preloadedImages = this.game.preloadedImages;
        //Hier habe ich noch nicht weitergemacht weil festgestellt das irgendwas kaput ist, was ich grade nicht gefixt bekomme
    }

    draw(ctx) {
        if (this.color.startsWith('img:')) {
            const imgSrc = this.color.replace('img:', ''); // Entfernt 'img:' vom String
            const img = new Image();
            img.src = 'img/'+imgSrc;



                switch (this.type.split(':')[0]) {
                    case 'player':
                        // ctx.fillStyle = 'green';
                        //ctx.fillRect(this.x -this.width / 2, this.y- this.height / 2, this.width, this.height);
                        img.src = this.animatePlayer('img/'+imgSrc);
                        ctx.drawImage(img, this.x -this.width / 2, this.y- this.height / 2, this.width+15, this.height+15);
                        break;
                    case 'enemy':
                        ctx.fillStyle = 'red';
                        ctx.fillRect(this.x -this.width / 2, this.y- this.height / 2, this.width, this.height);
                        ctx.drawImage(img, this.x -this.width / 2, this.y- this.height / 2, this.width, this.height);
                        break;
                    case 'item':
                        ctx.fillStyle = 'purple';
                        ctx.fillRect(this.x -this.width / 2, this.y- this.height / 2, this.width, this.height);
                        ctx.drawImage(img, this.x -this.width / 2, this.y- this.height / 2, this.width, this.height);
                        break;
                    default:
                        ctx.drawImage(img, this.x -this.width / 2, this.y- this.height / 2, this.width, this.height);
                        break;
                }



            img.onload = () => {

            };
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x -this.width / 2, this.y- this.height / 2, this.width, this.height);
        }
    }


    animatePlayer(img){
        this.frame = (this.frame +1) % 18  ;

        img =  img.split('_')[0]+"_"+[this.pad(this.frame,3)]+"."+img.split('.')[1];
        return img;
    }
    isColliding(other) {
        // Berechnet das effektive Kollisions-Rechteck eines Objekts.
        // Bei Spielern wird nur die untere Hälfte genutzt.
        const getEffectiveRect = (obj) => {
            if (obj.type === 'player') {
                return {
                    x: obj.x,
                    y: obj.y + obj.height / 2, // obere Hälfte weglassen
                    width: obj.width /2,
                    height: obj.height / 2
                };
            } else {
                return {
                    x: obj.x,
                    y: obj.y,
                    width: obj.width,
                    height: obj.height
                };
            }
        };

        const rect1 = getEffectiveRect(this);
        const rect2 = getEffectiveRect(other);

        return rect1.x < rect2.x + rect2.width &&
            rect1.x + rect1.width > rect2.x &&
            rect1.y < rect2.y + rect2.height &&
            rect1.y + rect1.height > rect2.y;
    }

     pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }

}

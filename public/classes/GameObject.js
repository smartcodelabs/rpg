// public/classes/GameObject.js
export default class GameObject {
    constructor(x, y, width, height, color, type = 'object') {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        this.frame = 0;
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

        img = img.split('_')[0]+"_"+[this.pad(this.frame,3)]+"."+img.split('.')[1];
        return img;
    }
    isColliding(other) {
        return this.x < other.x + other.width &&
            this.x + this.width > other.x &&
            this.y < other.y + other.height &&
            this.y + this.height > other.y;
    }

     pad(num, size) {
        num = num.toString();
        while (num.length < size) num = "0" + num;
        return num;
    }
}

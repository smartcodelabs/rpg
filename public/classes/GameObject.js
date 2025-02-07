import Game from "./Game.js";

export default class GameObject {
    constructor(game, x, y, width, height, color, type, conditions = []) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = color;
        this.type = type;
        this.conditions = conditions;
        this.game = game
        this.preloadedImages = this.game.preloadedImages;
    }

    draw(ctx) {
        if (this.color.startsWith('img:')) {
            const imgSrc = this.color.replace('img:', ''); // Entfernt 'img:' vom String
            const img = new Image();
            img.src = 'img/' + imgSrc;


            switch (this.type.split(':')[0]) {
                case 'item':
                    //ctx.fillStyle = 'purple';
                    //ctx.fillRect(this.x -this.width / 2, this.y- this.height / 2, this.width, this.height);
                    ctx.drawImage(img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
                    break;
                default:
                    ctx.drawImage(img, this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
                    break;
            }


            img.onload = () => {

            };
        } else {
            ctx.fillStyle = this.color;
            ctx.fillRect(this.x - this.width / 2, this.y - this.height / 2, this.width, this.height);
        }
    }


    isColliding(other) {
        // Berechnet das effektive Kollisions-Rechteck eines Objekts
        // Bei Spielern wird nur die untere Hälfte genutzt
        const getEffectiveRect = (obj) => {


            if (obj.type === 'player') {
                return {
                    x: obj.x, y: obj.y + obj.height / 2, // obere Hälfte weglassen
                    width: obj.width / 2, height: obj.height / 2
                };
            } else {
                return {
                    x: obj.x, y: obj.y, width: obj.width, height: obj.height
                };
            }
        };

        const rect1 = getEffectiveRect(this);
        const rect2 = getEffectiveRect(other);

        return rect1.x < rect2.x + rect2.width && rect1.x + rect1.width > rect2.x && rect1.y < rect2.y + rect2.height && rect1.y + rect1.height > rect2.y;
    }

    isUnlocked() {
        // Keine Bedingungen: immer entsperrt
        if (!this.conditions || this.conditions.length === 0) return true;

        for (let condition of this.conditions) {
            switch (condition.type) {
                case "item": {

                    let totalCount = 0;
                    for (let item of this.game.player.inventory) {

                        if (item.type === `item:${condition.id}`) {
                            // Falls das Item gestapelt ist nutze den Stack-Wert ansonsten 1
                            totalCount += item.stack ? item.stack : 1;
                        }
                    }
                    if (totalCount < condition.count) {
                        return false;
                    }
                    break;
                }
                case "enemy": {
                    // Logik hierfür ist noch in der Denkschmiede
                    break;
                }
                default:
                    console.warn(`Unbekannter Bedingungstyp: ${condition.type}`);
                    return false;
            }
        }

        return true;
    }


}

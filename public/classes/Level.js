// public/classes/Level.js
export default class Level {

    constructor(id, backgroundImageSrc, playerStart, enemyStart, objects ) {
        this.id = id;
        this.backgroundImage = new Image();
        this.backgroundMaskImage = new Image();
        this.backgroundImage.src = `img/levels/${backgroundImageSrc}`; // Hintergrundbild des Levels
        this.backgroundMaskImage.src = `img/levels/${backgroundImageSrc.split('.')[0]}.mask`; // Hintermask des Levels
        this.offscreen_canvas = document.createElement("canvas")
        this.offscreen_canvas.width =1024
        this.offscreen_canvas.height=800
        this.offscreen_ctx = this.offscreen_canvas.getContext("2d")
        this.playerStart = playerStart;
        this.enemyStart = enemyStart;
        this.objects = objects;
        this.map_data = []
        this.tmp_data = []
        this.grayImageData = null

        this.backgroundMaskImage.onload = ()  =>{
            this.offscreen_ctx.drawImage(this.backgroundMaskImage, 0, 0, this.offscreen_canvas.width, this.offscreen_canvas.height);
            this.generateMap(this.offscreen_ctx)

        }



        this.backgroundImage.onload = () => {
            // Erstelle ein temporäres Canvas, dessen Größe dem Hintergrundbild entspricht.
            const c = document.createElement("canvas");
            c.width = this.backgroundImage.width;
            c.height = this.backgroundImage.height;
            const ctx = c.getContext("2d");

            // Setze den Graustufen-Filter
            ctx.filter = "grayscale(100%)";

            // Zeichne das Bild mit aktivem Filter ins Canvas
            ctx.drawImage(this.backgroundImage, 0, 0, c.width, c.height);

            // Setze den onload-Handler zurück, damit er nicht erneut aufgerufen wird.
            this.backgroundImage.onload = null;

            // Aktualisiere die Quelle des Hintergrundbilds mit dem gefilterten Canvas-Bild.
            this.backgroundImage.src = c.toDataURL();

            // Entferne das temporäre Canvas
            c.remove();
        };


//this.backgroundImage.src = `img/levels/${backgroundImageSrc}`; // Hintergrundbild des Levels
//         this.backgroundImage.onload = () => {
//             let c = document.createElement("canvas")
//             c.width = this.backgroundImage.width
//             c.height = this.backgroundImage.height
//
//             let ctx = c.getContext("2d")
//
//
//             if (!this.grayImageData) {
//
//
//
//                 ctx.drawImage(this.backgroundImage, 0, 0, c.width, c.height);
//                 let imageData = ctx.getImageData(0, 0, c.width, c.height)
//
//
//                 let data = new Uint8ClampedArray(imageData.data.length).fill(0)
//                 for (let i = 0; i < imageData.data.length; i += 4) {
//                     let r = imageData.data[i]
//                     let g = imageData.data[i + 1]
//                     let b = imageData.data[i + 2]
//
//                     let avg = (r + g + b) / 3
//                     data[i] = avg
//                     data[i + 1] = avg
//                     data[i + 2] = avg
//                     data[i + 3] = 255
//
//
//                 }
//
//                 this.grayImageData = data
//
//
//             }
//
//             let imageData = ctx.createImageData(c.width, c.height)
//
//             imageData.data.set(this.grayImageData)
//
//             ctx.putImageData(imageData, 0, 0)
//
//             this.backgroundImage.onload = null;
//             this.backgroundImage.src = c.toDataURL()
//             c.remove()
//         }
    }

    drawBackground(ctx, canvas) {
        ctx.drawImage(this.backgroundImage, 0, 0, canvas.width, canvas.height);
        this.offscreen_ctx.drawImage(this.backgroundMaskImage, 0, 0, this.offscreen_canvas.width, this.offscreen_canvas.height);
    }

    //Quelle Sven
    generateMap(ctx) {
       let data = ctx.getImageData(0,0,1024,800).data
        for( let i = 0; i < data.length; i+=4) {
            if( parseInt(i / 4) % 1024 == 0 )
                this.tmp_data = []
            this.tmp_data.push( data[i] == 0 )

            if( parseInt(i / 4) % 1024 == 1019 ) {
                this.map_data.push(this.tmp_data)
            }
        }


    }

    removeObject(object) {
        this.objects.splice(this.objects.indexOf(object), 1);
    }

}

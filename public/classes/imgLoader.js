export default class ImgLoader {
// Scheiß arbeit alles von hand umschreiben -.-
    constructor() {
        this.images = {
            items: this.loadImages([
                "img/items/apple.png",
                "img/items/key_gold.png",
                "img/items/key_silver.png",
                "img/items/potion.png",
                "img/items/trap.png",
            ]),
            enemy: this.loadImages([
                "img/enemys/enemy1.png",
            ]),
            level: this.loadImages([
                "img/levels/background0.jpg",
                "img/levels/background0.mask",
                "img/levels/background1.jpg",
                "img/levels/dungeon2.jpg",

            ]),
            player: {
                idle: this.loadImages([
                    "img/player/Idle/Idle_000.png",
                    "img/player/Idle/Idle_001.png",
                    "img/player/Idle/Idle_002.png",
                    "img/player/Idle/Idle_003.png",
                    "img/player/Idle/Idle_004.png",
                    "img/player/Idle/Idle_005.png",
                    "img/player/Idle/Idle_006.png",
                    "img/player/Idle/Idle_007.png",
                    "img/player/Idle/Idle_008.png",
                    "img/player/Idle/Idle_009.png",
                    "img/player/Idle/Idle_010.png",
                    "img/player/Idle/Idle_011.png",
                    "img/player/Idle/Idle_012.png",
                    "img/player/Idle/Idle_013.png",
                    "img/player/Idle/Idle_014.png",
                    "img/player/Idle/Idle_015.png",
                    "img/player/Idle/Idle_016.png",
                    "img/player/Idle/Idle_017.png",

                ]),
                hurt: this.loadImages([
                    "img/player/Hurt/Hurt_000.png",
                    "img/player/Hurt/Hurt_001.png",
                    "img/player/Hurt/Hurt_002.png",
                    "img/player/Hurt/Hurt_003.png",
                    "img/player/Hurt/Hurt_004.png",
                    "img/player/Hurt/Hurt_005.png",
                    "img/player/Hurt/Hurt_006.png",
                    "img/player/Hurt/Hurt_007.png",
                    "img/player/Hurt/Hurt_008.png",
                    "img/player/Hurt/Hurt_009.png",
                    "img/player/Hurt/Hurt_010.png",
                    "img/player/Hurt/Hurt_011.png",

                ]),
                gameover: this.loadImages([
                    "img/player/GameOver/gameover.webp",
                ]),
                dying: this.loadImages([
                    "img/player/Dying/Dying_000.png",
                    "img/player/Dying/Dying_001.png",
                    "img/player/Dying/Dying_002.png",
                    "img/player/Dying/Dying_003.png",
                    "img/player/Dying/Dying_004.png",
                    "img/player/Dying/Dying_005.png",
                    "img/player/Dying/Dying_006.png",
                    "img/player/Dying/Dying_007.png",
                    "img/player/Dying/Dying_008.png",
                    "img/player/Dying/Dying_009.png",
                    "img/player/Dying/Dying_010.png",
                    "img/player/Dying/Dying_011.png",
                    "img/player/Dying/Dying_012.png",
                    "img/player/Dying/Dying_013.png",
                    "img/player/Dying/Dying_014.png",
                ]),
                slashing: this.loadImages([
                    "img/player/Slashing/Slashing_000.png",
                    "img/player/Slashing/Slashing_001.png",
                    "img/player/Slashing/Slashing_002.png",
                    "img/player/Slashing/Slashing_003.png",
                    "img/player/Slashing/Slashing_004.png",
                    "img/player/Slashing/Slashing_005.png",
                    "img/player/Slashing/Slashing_006.png",
                    "img/player/Slashing/Slashing_007.png",
                    "img/player/Slashing/Slashing_008.png",
                    "img/player/Slashing/Slashing_009.png",
                    "img/player/Slashing/Slashing_010.png",
                    "img/player/Slashing/Slashing_011.png",
                ]),
                walking: this.loadImages([
                    "img/player/Walking/Walking_000.png",
                    "img/player/Walking/Walking_001.png",
                    "img/player/Walking/Walking_002.png",
                    "img/player/Walking/Walking_003.png",
                    "img/player/Walking/Walking_004.png",
                    "img/player/Walking/Walking_005.png",
                    "img/player/Walking/Walking_006.png",
                    "img/player/Walking/Walking_007.png",
                    "img/player/Walking/Walking_008.png",
                    "img/player/Walking/Walking_009.png",
                    "img/player/Walking/Walking_010.png",
                    "img/player/Walking/Walking_011.png",
                    "img/player/Walking/Walking_012.png",
                    "img/player/Walking/Walking_013.png",
                    "img/player/Walking/Walking_014.png",
                    "img/player/Walking/Walking_015.png",
                    "img/player/Walking/Walking_016.png",
                    "img/player/Walking/Walking_017.png",
                    "img/player/Walking/Walking_018.png",
                    "img/player/Walking/Walking_019.png",
                    "img/player/Walking/Walking_020.png",
                    "img/player/Walking/Walking_021.png",
                    "img/player/Walking/Walking_022.png",
                    "img/player/Walking/Walking_023.png",

                ])


            },
        };
    }
    //Wer das liest muss mit 1 Benoten !!!
    loadImages(paths) {
        const images = [];
        paths.forEach((path) => {
            const img = new Image();
            img.src = path;
            img.onload = () => console.log(`${path} geladen`);
            img.onerror = () => console.error(`${path} konnte nicht geladen werden`);
            images.push(img);
        });
        return images;
    }


}
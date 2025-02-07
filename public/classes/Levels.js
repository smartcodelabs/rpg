import GameObject from "./GameObject.js";
import Level from "./Level.js";

export default class Levels {
    constructor(game) {
        this.debug = false;
        this.game = game;
        this.levels = [];
        this.generateLevels();
    }


    generateLevels() {

        const colorWalls = !this.debug ? 'rgba(0, 0, 0, 0)':'rgba(255, 0, 0, 0.4)';
        const colorExit = !this.debug ? 'rgba(0, 0, 0, 0)':'rgba(255, 255, 0, 0.4)';
        const colorWater = !this.debug ? 'rgba(0, 0, 0, 0)':'rgba(0, 0, 255, 0.4)';
        const colorTree = !this.debug ? 'rgba(0, 0, 0, 0)':'rgba(0, 255, 0, 0.4)';

// Level 0: Erstelle ein Exit-Objekt, das in Level 1 wechselt
        const exitObj0 = new GameObject(this.game,920, 170, 25, 25, colorExit, 'exit');
        exitObj0.nextLevel = 1;
        this.levels.push(new Level(
            0,
            'background0.jpg', // Hintergrundbild
            { x: 30, y: 360 },
            { x: 400, y: 300 },
            [

                ...this.boarder(),


                //Items
                new GameObject(this.game,475, 125, 30, 30, 'img:/items/apple.png', 'item:apple'),
                new GameObject(this.game,630, 370, 30, 30, 'img:/items/apple.png', 'item:apple'),
                new GameObject(this.game,40, 600, 30, 30, 'img:/items/apple.png', 'item:apple'),
                exitObj0
            ]
        ));

// Level 1: Exit-Objekt, das zurück zu Level 0 wechselt
        const exitObj1 = new GameObject(this.game,390, 65, 25, 25, 'rgba(0, 0, 0, 0)', 'exit');
        exitObj1.nextLevel = 0;
        exitObj1 .spawnPoint = { x: 700, y: 200 };
        this.levels.push(new Level(
            1,
            'background1.jpg', // Hintergrundbild
            { x: 350, y: 150 },
            { x: 300, y: 300 },
            [

                // Grenzen des Levels
                ...this.boarder(),


                //new GameObject(this.game,250, 250, 60, 60, 'brown', 'obstacle'),
                new GameObject(this.game,600, 400, 30, 30, 'yellow', 'item'),
                exitObj1
            ]
        ));

// Level 2: Exit-Objekt, das zurück zu Level 0 wechselt

        const exitObj2 = new GameObject(this.game,750, 550, 25, 25, 'rgba(0, 0, 0, 0)', 'exit');
        exitObj2.nextLevel = 0;
        this.levels.push(new Level(
            2,
            'dungeon2.jpg', // Hintergrundbild (muss im public-Ordner liegen)
            { x: 550, y: 500 }, // Startposition des Spielers
            { x: 700, y: 500 }, // Zielposition
            [
                // Grenzen des Levels
                ...this.boarder(),



                // Fallen
                new GameObject(this.game,250, 250, 50, 50, 'img:/items/trap.png', 'item:trap'),
                new GameObject(this.game,500, 450, 50, 50, 'img:/items/trap.png', 'item:trap'),

                // Gegenstände
                new GameObject(this.game,350, 300, 30, 30, 'img:/items/key_silver.png', 'item:key_silver'),
                new GameObject(this.game,550, 500, 30, 30, 'img:/items/potion.png', 'item:potion'),

                exitObj1
            ]
        ));

    }

    boarder(){
        return [                // Grenzen des Levels
            new GameObject(this.game,0, 0, 1024, 1, 'rgba(0, 0, 0, 0)', 'border'),
            new GameObject(this.game,0, 0, 1, 800, 'rgba(0, 0, 0, 0)', 'border'),
            new GameObject(this.game,0, 800, 1024, 1, 'rgba(0, 0, 0, 0)', 'border'),
            new GameObject(this.game,1024, 0, 1, 800, 'rgba(0, 0, 0, 0)', 'border'),
        ]
    }

}
import GameObject from './classes/GameObject.js';
import Level from './classes/Level.js';
import Game from './classes/Game.js';

const debug = false;

const colorWalls = debug ? 'rgba(0, 0, 0, 0)':'rgba(255, 0, 0, 0.4)';
const colorExit = debug ? 'rgba(0, 0, 0, 0)':'rgba(255, 255, 0, 0.4)';
const colorWater = debug ? 'rgba(0, 0, 0, 0)':'rgba(0, 0, 255, 0.4)';
const colorTree = debug ? 'rgba(0, 0, 0, 0)':'rgba(0, 255, 0, 0.4)';


const levels = [];

// Level 0: Erstelle ein Exit-Objekt, das in Level 1 wechselt
const exitObj0 = new GameObject(710, 120, 25, 25, colorExit, 'exit');
exitObj0.nextLevel = 1;
levels.push(new Level(
    0,
    'background0.jpg', // Hintergrundbild (muss im public-Ordner liegen)
    { x: 50, y: 50 },
    { x: 400, y: 300 },
    [

        //          0/0      800/0
        //
        //          600/0    600/800

        //Border
        new GameObject(0, 0, 800, 1, colorWalls, 'border'),
        new GameObject(0, 0, 1, 600, colorWalls, 'border'),
        new GameObject(0, 600, 800, 1, colorWalls, 'border'),
        new GameObject(800, 0, 1, 600, colorWalls, 'border'),


        //Water
        new GameObject(435, 0, 100, 50, colorWater, 'water'),
        new GameObject(435, 110, 100, 150, colorWater, 'water'),
        new GameObject(435, 340, 100, 90, colorWater, 'water'),
        new GameObject(435, 510, 100, 150, colorWater, 'water'),

        //Trees
        new GameObject(40, 270, 90, 165, colorTree, 'tree'),


        //Items
        new GameObject(355, 95, 30, 30, 'img:/items/apple.png', 'item:apple'),
        new GameObject(355, 150, 30, 30, 'img:/items/apple.png', 'item:apple'),
        new GameObject(10, 300, 30, 30, 'img:/items/apple.png', 'item:apple'),
        exitObj0
    ]
));

// Level 1: Exit-Objekt, das zurück zu Level 0 wechselt
const exitObj1 = new GameObject(390, 65, 25, 25, 'rgba(0, 0, 0, 0)', 'exit');
exitObj1.nextLevel = 0;

levels.push(new Level(
    1,
    'background1.jpg', // Hintergrundbild
    { x: 350, y: 150 },
    { x: 300, y: 300 },
    [

            // Grenzen des Levels
            new GameObject(0, 0, 800, 1, 'rgba(0, 0, 0, 0)', 'border'),
            new GameObject(0, 0, 1, 600, 'rgba(0, 0, 0, 0)', 'border'),
            new GameObject(0, 600, 800, 1, 'rgba(0, 0, 0, 0)', 'border'),
            new GameObject(800, 0, 1, 600, 'rgba(0, 0, 0, 0)', 'border'),


        //new GameObject(250, 250, 60, 60, 'brown', 'obstacle'),
        new GameObject(600, 400, 30, 30, 'yellow', 'item'),
        exitObj1
    ]
));


const exitObj2 = new GameObject(750, 550, 25, 25, 'rgba(0, 0, 0, 0)', 'exit');
exitObj2.nextLevel = 0;
levels.push(new Level(
    2,
    'dungeon2.jpg', // Hintergrundbild (muss im public-Ordner liegen)
    { x: 100, y: 100 }, // Startposition des Spielers
    { x: 700, y: 500 }, // Zielposition
    [
        // Grenzen des Levels
        new GameObject(0, 0, 800, 1, 'rgba(0, 0, 0, 0)', 'border'),
        new GameObject(0, 0, 1, 600, 'rgba(0, 0, 0, 0)', 'border'),
        new GameObject(0, 600, 800, 1, 'rgba(0, 0, 0, 0)', 'border'),
        new GameObject(800, 0, 1, 600, 'rgba(0, 0, 0, 0)', 'border'),

        // Wände
        new GameObject(0, 0, 800, 20, 'rgba(1, 0, 0, 1)', 'wall'),
        new GameObject(145, 20, 20, 100, 'rgba(1, 0, 0, 1)', 'wall'),
        new GameObject(230, 20, 20, 120, 'rgba(1, 0, 0, 1)', 'wall'),
        new GameObject(300, 350, 100, 10, 'rgba(1, 0, 0,1)', 'wall'),
        new GameObject(600, 400, 150, 10, 'rgba(1, 0, 0, 1)', 'wall'),

        // Fallen
        new GameObject(250, 250, 50, 50, 'img:/items/trap.png', 'item:trap'),
        new GameObject(500, 450, 50, 50, 'img:/items/trap.png', 'item:trap'),

        // Gegenstände
        new GameObject(350, 300, 30, 30, 'img:/items/key_silver.png', 'item:key_silver'),
        new GameObject(550, 500, 30, 30, 'img:/items/potion.png', 'item:potion'),

        exitObj1
    ]
));

// Starte das Spiel
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

const game = new Game(canvas, ctx, levels);

game.currentLevelIndex= 0

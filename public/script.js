import Game from './classes/Game.js';


// Starte das Spiel
const canvas = document.getElementById('gameCanvas');

const ctx = canvas.getContext('2d');


const game = new Game(ctx);

game.currentLevelIndex = 0

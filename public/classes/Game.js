import Player from "./Player.js";
import Enemy from "./Enemy.js";
import UserInterface from './UserInterface.js';
import imgLoader from './imgLoader.js';
import Levels from "./Levels.js";

export default class Game {
    constructor(ctx) {


        this.canvas = ctx.canvas;
        this.uiCanvas = document.getElementById("uiCanvas");
        this.uiCtx = this.uiCanvas.getContext("2d");
        this.ctx = ctx;

        this.currentLevelIndex = 0;
        this.ignored = [];
        //debug
        this.mouseX = 0;
        this.mouseY = 0;
        this.paused = false;
        console.error("-------GAME----------")
        this.loader = new imgLoader();
        this.preloadedImages = this.loader.images;


        this.levels = new Levels(this).levels;
        this.player = new Player(this, 0, 0, 32, 32, 'img:/player/Idle/Idle_000.png');
        this.ui = new UserInterface(this.uiCtx, this.player);
        this.keys = {};
        this.setupInput();
        this.currentLevel = null
        this.loadLevel(this.currentLevelIndex);
        this.gameLoop();

        this.canvas.addEventListener('mousemove', (e) => {
            const rect = this.canvas.getBoundingClientRect();
            this.mouseX = e.clientX - rect.left;
            this.mouseY = e.clientY - rect.top;
        })

    }

    setupInput() {
        document.addEventListener('keydown', (e) => {
            this.keys[e.key] = true;
        });
        document.addEventListener('keyup', (e) => {
            this.keys[e.key] = false;
        });


    }

    loadLevel(levelIndex, spawnPoint = null) {
        this.currentLevelIndex = levelIndex;
        this.currentLevel = this.levels[levelIndex];

        // Setze die Startposition des Spielers:
        if (spawnPoint) {
            this.player.x = spawnPoint.x;
            this.player.y = spawnPoint.y;
        } else {
            this.player.x = this.currentLevel.playerStart.x;
            this.player.y = this.currentLevel.playerStart.y;
        }

        this.ui.addMessage(`Level ${levelIndex} geladen`);
        this.ui.addMessage(this.currentLevel.description);

    }

    //Debug maus

    //hier muss noch vieles in Plaser.js ausgelagert werden
    update() {
        this.ui.draw(this.ctx)
        document.getElementById("debugMouse").innerHTML = `
        Maus X: ${this.mouseX}
        Maus Y: ${this.mouseY}
        `
        // Spielerbewegung
        const playerPrevX = this.player.x;
        const playerPrevY = this.player.y;


        this.player.move(this.keys);

        //enemys in level object updaten
        this.levels[this.currentLevelIndex].objects.forEach(obj => {
            if (obj.type === 'enemy') {
                obj.update(this.player);
            }

        })


        //Kollisionsüberprüfung
        const level = this.levels[this.currentLevelIndex];


        level.map_data.forEach((row, rowIndex) => {
            let y = rowIndex;
            row.forEach((row2, row2Index) => {
                let x = row2Index;


            });
        });

        level.objects.forEach(obj => {
            if (this.player.isColliding(obj)) {
                let pc = this.player.isColliding(obj);
                let o = obj.type.split(':')[0];
                let item = obj.type.split(':')[1];

                switch (o) {
                    case 'exit':
                        if (pc) {
                            if (obj.isUnlocked()) {
                                console.log("Levelwechsel!");
                                // Prüfe, ob das Exit-Objekt einen individuellen Spawnpunkt definiert hat
                                let spawnPoint = null;
                                if (obj.spawnPoint) {
                                    spawnPoint = obj.spawnPoint;
                                }
                                this.loadLevel(obj.nextLevel, spawnPoint);

                            } else {
                                this.ui.addMessage("Portal gesperrt sammel erst 5 Äpfel!");
                            }


                        }

                        break;
                    case 'obstacle':
                    case 'wall':
                    case 'water':
                    case 'lava':
                    case 'tree':
                    case 'border':
                        if (this.player.isColliding(obj)) {
                            this.player.x = playerPrevX;
                            this.player.y = playerPrevY;
                        }
                        // else if (this.enemy.isColliding(obj)){
                        //     this.enemy.x = enemyPrevX;
                        //     this.enemy.y = enemyPrevY;
                        //     this.enemy.colision = true;
                        // }


                        break;
                    case 'item':
                        if (this.player.isColliding(obj)) {
                            // Extrahiere den Item-Schlüssel, z. B. "apple" aus "item:apple"
                            const itemId = obj.type.split(":")[1];
                            let playerInv = this.player.inventory;

                            // Versuche, einen existierenden Stack für diesen Item-Typ zu finden
                            let existingStack = playerInv.find(item => item.type === obj.type);

                            if (existingStack) {
                                // Falls der Stack noch nicht voll ist, füge das Item hinzu
                                if (existingStack.stack < 64) {
                                    existingStack.stack++;
                                    level.removeObject(obj);
                                } else {
                                    // Der Stack ist voll – versuche, einen neuen Stack anzulegen, wenn Platz ist
                                    if (playerInv.length < this.player.invSize) {
                                        // Setze den Stack-Zähler des neuen Items auf 1
                                        obj.stack = 1;
                                        level.removeObject(obj);
                                        playerInv.push(obj);
                                    } else if (!this.ignored.includes(obj)) {
                                        console.log(`Inventar ist voll, kann ${itemId} nicht einsammeln!`);
                                        this.ignored.push(obj);
                                        setTimeout(() => {
                                            const index = this.ignored.indexOf(obj);
                                            if (index !== -1) {
                                                this.ignored.splice(index, 1);
                                            }
                                        }, 3000);
                                    }
                                }
                            } else {
                                // Es existiert noch kein Stack für diesen Item-Typ
                                if (playerInv.length < this.player.invSize) {
                                    // Erstelle einen neuen Stack: Setze die Stackgröße auf 1 und füge das Item hinzu
                                    obj.stack = 1;
                                    level.removeObject(obj);
                                    playerInv.push(obj);
                                } else if (!this.ignored.includes(obj)) {
                                    console.log(`Inventar ist voll, kann ${itemId} nicht einsammeln!`);
                                    this.ignored.push(obj);
                                    setTimeout(() => {
                                        const index = this.ignored.indexOf(obj);
                                        if (index !== -1) {
                                            this.ignored.splice(index, 1);
                                        }
                                    }, 3000);
                                }
                            }
                        }
                        break;

                    default:
                        break;
                }
            }
        });
    }

    draw() {
        const level = this.levels[this.currentLevelIndex];
        level.drawBackground(this.ctx, this.canvas);

        //Zeichne objekte
        level.objects.forEach(obj => {
            obj.draw(this.ctx);
        });

        //Zeichne Spieler
        this.player.draw(this.ctx);
    }

    gameLoop() {
        if (!this.paused) {
            this.update();
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }


    }
}

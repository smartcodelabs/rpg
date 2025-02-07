
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
        // Spieler und Gegner werden erstellt – ihre Positionen werden beim Laden des Levels gesetzt.
        this.player = new Player(this,0, 0, 32, 32, 'img:/player/Idle/Idle_000.png');
        this.enemy = new Enemy(this,0, 0, 32, 32, 'img:/enemys/enemy1.png');
        this.ui = new UserInterface(this.uiCtx,this.player);


        this.keys = {};
        this.setupInput();

        this.loadLevel(this.currentLevelIndex);
        this.gameLoop();





        //console.log(this.preloadedImages.lenght() );


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
        const level = this.levels[levelIndex];

        // Setze die Startposition des Spielers:
        if (spawnPoint) {
            this.player.x = spawnPoint.x;
            this.player.y = spawnPoint.y;
        } else {
            this.player.x = level.playerStart.x;
            this.player.y = level.playerStart.y;
        }

        // Setze die Startposition des Gegners (oder anderer Objekte) wie gewohnt:
        this.enemy.x = level.enemyStart.x;
        this.enemy.y = level.enemyStart.y;
        console.log(`Level ${levelIndex} geladen`);
    }

    //Debug maus



    update() {
        this.ui.draw(this.ctx)
        document.getElementById("debugMouse").innerHTML = `
        Maus X: ${this.mouseX}
        Maus Y: ${this.mouseY}
        `
        // Spielerbewegung
        const playerPrevX = this.player.x;
        const playerPrevY = this.player.y;
        const enemyPrevX = this.enemy.x;
        const enemyPrevY = this.enemy.y;

        this.player.move(this.keys);
        this.enemy.update(this.player);


        //Kollisionsüberprüfung Gegner
        if (this.player.isColliding(this.enemy) && !this.ignored.includes(this.enemy)) {
            this.ignored.push(this.enemy);
            console.log("Kampf gestartet!");
            this.player.health -= Math.floor(Math.random() * (20 - 10 + 1)) + 10;
            this.enemy.x = enemyPrevX;
            this.enemy.y = enemyPrevY;

            if(this.player.health <= 0){
                this.player.health = 0;
                alert("Du hast dich verletzt!");
            }
            setTimeout(() => {
                const index = this.ignored.indexOf(this.enemy);
                if (index !== -1) {
                    this.ignored.splice(index, 1);
                }
            }, 1500);

        }



        if (this.player.isColliding(this.player)) {
            //später pvp Kämpfe runden basiert
        }



        //Kollisionsüberprüfung
        const level = this.levels[this.currentLevelIndex];


        level.map_data.forEach((row, rowIndex) => {
               let y = rowIndex;
            row.forEach((row2, row2Index) => {
               let x = row2Index;
               this


            });
        });

        level.objects.forEach(obj => {
            if (this.player.isColliding(obj) || this.enemy.isColliding(obj)) {
                let pc = this.player.isColliding(obj);
                let o = obj.type.split(':')[0];
                let item = obj.type.split(':')[1];

                switch(o) {
                    case 'exit':
                        if (pc){
                            console.log("Levelwechsel!");
                            // Prüfe, ob das Exit-Objekt einen individuellen Spawnpunkt definiert hat
                            let spawnPoint = null;
                            if (obj.spawnPoint) {
                                spawnPoint = obj.spawnPoint;
                            }
                            this.loadLevel(obj.nextLevel, spawnPoint);
                        }

                        break;
                    case 'obstacle':
                    case 'wall':
                    case 'water':
                    case 'lava':
                    case 'tree':
                    case 'border':
                        if (this.player.isColliding(obj)){
                            this.player.x = playerPrevX;
                            this.player.y = playerPrevY;
                        }else if (this.enemy.isColliding(obj)){
                            this.enemy.x = enemyPrevX;
                            this.enemy.y = enemyPrevY;
                            this.enemy.colision = true;
                        }


                        break;
                    case 'item':
                        if (this.player.isColliding(obj)){
                            let playerInv = this.player.inventory;


                            if (playerInv.length < this.player.invSize) {
                                level.removeObject(obj);
                                this.player.inventory.push(obj);
                            }else if(!this.ignored.includes(obj)){

                                console.log(`Inventar ist voll kann ${obj.type.split(":")[1]} nicht einsammeln!`);

                                this.ignored.push(obj);


                                setTimeout(() => {
                                    const index = this.ignored.indexOf(obj);
                                    if (index !== -1) {
                                        this.ignored.splice(index, 1);
                                    }
                                }, 3000);

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

        //Zeichne Spieler und Gegner
        this.player.draw(this.ctx);
        this.enemy.draw(this.ctx);
    }

    gameLoop() {
        if (!this.paused) {
            this.update();
            this.draw();
            requestAnimationFrame(() => this.gameLoop());
        }


    }
}

class World {
    character = new Character();
    level = level1;
    canvas;
    ctx;
    keyboard;
    camera_x = 0;
    DrawableObject = new DrawableObject()
    MovableObject = new MovableObject()
    statusBar = new statusBar();
    bossBar = new bossBar();
    coinBar = new coinBar();
    ammoBar = new ammoBar();
    throwableObjects = [];
    soundEnabel = true;
    playerDropFromAir = false;
    backgroundmusic = new Audio('javascript/music/EpicMusic.mp3');
    coinSound = new Audio('javascript/music/Coin.mp3');
    bottleSound = new Audio('javascript/music/Bottle.mp3');
    chickenSound = new Audio('javascript/music/Chicken.mp3');
    playerSound = new Audio('javascript/music/PlayerHurt.mp3');

    constructor(canvas, keyboard) {
        this.ctx = canvas.getContext('2d');
        this.canvas = canvas;
        this.keyboard = keyboard;
        this.draw();
        this.setworld();
        this.worldInterval();
    }

    /**
    * 
    * @param {string} backgroundmusic - The BackgroundMusic.
    * @param {string} coinSound - The Coin.
    * @param {string} bottleSound - The Bottle.
    * @param {string} chickenSound - The Chick.
    * @param {string} playerSound - The Playersound.
    */
    music() {
        this.backgroundmusic.play();
        this.backgroundmusic.volume = 0.1;
        this.coinSound.volume = 0.1;
        this.bottleSound.volume = 0.1;
        this.chickenSound.volume = 0.1;
        this.playerSound.volume = 0.4;
    }

    /**
    * adding the character a back function to direc interactive with World
    * 
    */
    setworld() {
        this.character.world = this;
    }

    /**
    * This function start the Interval of World.
    * 
    */
    worldInterval() {
        let InteractivInterval = setInterval(() => {
            this.playerDrop();
            this.isChacterTakingDamage()
            this.checkThrowableObjects();
            this.checkpickup();
            this.chickenNoise();
            if (this.soundEnabel) {
                this.music();
            }
        }, 60)
        IntervalofTheGame('World-Collision', InteractivInterval);
    }

    /**
    * This function Check if the Character is taking Damage or it deals Damage.
    * 
    */
    isChacterTakingDamage() {
        if (!this.character.isAboveGround()) {
            this.playerTakeDamage();
        } else if (this.playerDropFromAir) {
            this.characterDealDamage(this.character);
        } else { }
    }

    /**
    * This function check if the player is high enough to deal damage.
    * 
    */
    playerDrop() {
        if (this.character.y < -30) {
            this.playerDropFromAir = true
        }
        if (this.character.y > 210) {
            this.playerDropFromAir = false
        }
    }

    /**
    * This function describes the rule if the player take Damage.
    * 
    * @param {boolean} hitPossilble - If the Enemies deal damage on player.
    */
    playerTakeDamage() {
        this.level.enemies.forEach((enemy) => {
            if (!enemy.hitPossilble) {
            } else
                if (this.character.isColliding(enemy)) {
                    if (this.character.ishitted == true) {
                        this.character.ishitted = false
                        this.character.hitpoints(enemy.attackDamage);
                        this.statusBar.setPercentage(this.character.health);
                        this.character.characterIsInvencible(this.character);
                        if (this.soundEnabel) {
                            this.playerSound.play();
                        }
                    }
                }
        });
    }

    /**
    * .
    * 
    * @param {chickenNoise()}  - Chicken Make Noise in background.
    */
    chickenNoise() {
        if (this.soundEnabel) {
            this.chickenSound.play();
        } else {
            this.chickenSound.pause();
        }
    }

    /**
    * This function allow the player to pickup Items.
    * 
    * @param {checkpickup()}  - Allow items to be picked up and added to their bar.
    */
    checkpickup() {
        this.level.Ammo.forEach((Ammo, index) => {
            if (this.character.isColliding(Ammo)) {
                if (this.soundEnabel) {
                    this.bottleSound.play();
                }
                this.level.Ammo.splice(index, 1)
                let Number = 21
                this.ammoBar.setPercentage(this.ammoBar.percentage + Number);
            }
        })
        this.level.Coin.forEach((Coin, index) => {
            if (this.character.isColliding(Coin)) {
                if (this.soundEnabel) {
                    this.coinSound.play()
                }
                this.level.Coin.splice(index, 1)
                let Number = 21
                this.coinBar.setPercentage(this.coinBar.percentage + Number);
            }
        })
    }

    /**
    * This function allow to Throwable Object.
    * 
    */
    checkThrowableObjects() {
        if (this.ammoBar.percentage > 0) {
            if (this.keyboard.D && this.MovableObject.isInCooldown) {
                let bottle = new ThrowableObjects(this.character.x + 100, this.character.y + 100, this.keyboard, this.character.otherDirection);
                this.throwableObjects.push(bottle);
                this.checkThrowableObjectsCooldown()
                this.checkThrowableObjectsMove(bottle)
                let Number = 19
                this.ammoBar.setPercentage(this.ammoBar.percentage - Number);
                this.DeleteBottle();
            }
        }
    }

    /**
    * This function delete the throwable Object after while if they are used.
    * 
    * 
    */
    DeleteBottle() {
        setTimeout(() => { this.throwableObjects.splice(0, 1) }, 3000);
    }

    /**
    * This Function adding cooldown for Throwable object.
    * 
    */
    checkThrowableObjectsCooldown() {
        this.MovableObject.isInCooldown = false
        this.MovableObject.ThrowableObjectsCooldown()
    }

    /**
    * This function updating the Position of throwable Object if their are Throw.
    * 
    * @param {string} bottle - bottle are the Throwable Object and they Interval Stops after a while.
    */
    checkThrowableObjectsMove(bottle) {
        let ThrowableObjectsIntervall = setInterval(() => {
            this.characterDealDamage(bottle);
        }, 120)
        setTimeout(() => { clearInterval(ThrowableObjectsIntervall) }, 3500)
    }

    /**
    * This function check if Enemies Take Damage.
    * 
    * @param {string} Player - Player is the Character.
    */
    characterDealDamage(Player) {
        this.level.enemies.forEach((enemy) => {
            if (Player.isColliding(enemy)) {
                Player.hitted = true
                this.checkIfEnemygetHitted(enemy, Player)
            }
        });
    }

    /**
    * This function describes the rule if a Enemy is hitting and filter in Boss or normal enemies.
    * 
    * @param {string} enemy - Enemy are the Chick.
    * @param {string} Player - Player is the Character.
    */
    checkIfEnemygetHitted(enemy, Player) {
        if (enemy.ishitted == true) {
            enemy.hitpoints(Player.attackDamage)
            if (enemy.isBoss == true) {
                enemy.ishitted = false
                this.character.characterIsInvencible(enemy);
                this.bossHealthDamage(enemy);
                this.deathRuleForBoss(enemy);
            } else {
                this.deathRuleIfEmeiesDie();
            }
        }
    }

    /**
    * This function updating the Boss Bar if the Boss is take damage.
    * 
    * @param {string} enemy - enemy is the Boss
    */
    bossHealthDamage(enemy) {
        this.bossBar.setPercentage(enemy.health);
    }

    /**
    * This function check if normal Enemies are dies.
    * 
    * @param {string} enemy - enemy are the small Chicken or normal Chicken.
    */
    deathRuleForBoss(enemy) {
        if (enemy.health <= 0) {
            enemy.isDeath = true
        }
    }

    /**
    * This function you can updating the number for the Imagen Bottle Bar.
    * 
    * @param {number} percentage - the number in this function update the number of the Imange.
    */
    deathRuleIfEmeiesDie() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.health <= 0) {
                enemy.isDeath = true
                setTimeout(() => {
                    this.enemydisplace();
                }, 1000);
            }
        })
    }

    /**
    * This function Disappear the Enemies.
    * 
    * @param {string} enemy - Interactive with Each Enemy
    */
    enemydisplace() {
        this.level.enemies.forEach((enemy) => {
            if (enemy.isDeath) {
                enemy.height = 0
                enemy.width = 0
            }
        })
    }

    /**
    * This function updating each second the Canvas.
    * 
    * @param {string} character - Updating the Character Each Second.
    * @param {string} BackgoundObjects - Updating the Backgounds Each Second.
    * @param {string} throwableObjects - Updating the Throwable Objects Each Second.
    * @param {number} camera_x - Updating the Camera with The position of Player Chacter x Each Second
    * @param {string} self - Updating the Canvas Each second.
    */
    draw() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.translate(this.camera_x, 0);
        this.addObjectsToMap(this.level.BackgoundObjects);

        this.addToMap(this.character,);
        this.addObjectsToMap(this.throwableObjects);

        this.itemsForPlayer()

        this.cameraChaseBar()

        this.ctx.translate(-this.camera_x, 0);

        // Draw() wird immer wieder aufgerufen.
        let self = this;
        requestAnimationFrame(function () {
            self.draw();
        });
    }

    /**
    * This function create several Object on the Canvas.
    * 
    * @param {string} objects - The string are only for several objects like the Chickens.
    */
    addObjectsToMap(objects) {
        objects.forEach(o => {
            this.addToMap(o);
        });
    }

    /**
    * This function create Object on the Canvas.
    * 
    * @param {string} mo - Are the Objects.
    * @param {boolean} otherDirection - Which view direction the object have.
    */
    addToMap(mo) {
        if (mo.otherDirection) {
            this.flipImage(mo)
        }
        mo.draw(this.ctx)
        /* mo.drawFrame(this.ctx); */

        if (mo.otherDirection) {
            this.flipImageBack(mo)
        }
    }

    /**
    * This function create a Direction for the Moveable Objects.
    * 
    * @param {string} isBoss - the Boss Chicken has a special rule.
    * @param {string} isCharacter - the Character has a special rule.
    * @param {boolean} otherDirection - Which view direction the object have.
    */
    flipImage(mo) {
        this.ctx.save();
        if (mo.isBoss) {
            this.ctx.translate(mo.img.width - 880, 0);
        } else if (mo.isCharacter) {
            this.ctx.translate(mo.img.width - 520, 0);
        } else {
            this.ctx.translate(mo.img.width - 480, 0);
        }
        this.ctx.scale(-1, 1);
        mo.x = mo.x * -1;
    }

    /**
    * This function switch the Imagen Direction for the Moveable Objects.
    * 
    * @param {string} mo - the Moveable Objects.
    */
    flipImageBack(mo) {
        this.ctx.restore();
        mo.x = mo.x * -1;
    }

    /**
    * This function loading the Status Bar for Player and Boss.
    * 
    */
    cameraChaseBar() {
        this.ctx.translate(-this.camera_x, 0);
        this.addToMap(this.statusBar);
        this.addToMap(this.coinBar);
        this.addToMap(this.ammoBar);
        this.addToMap(this.bossBar);
        this.ctx.translate(this.camera_x, 0);
    }

    /**
    * This function loading Level objects.
    * 
    */
    itemsForPlayer() {
        this.addObjectsToMap(this.level.Coin);
        this.addObjectsToMap(this.level.Ammo);
        this.addObjectsToMap(this.level.enemies);
        this.addObjectsToMap(this.level.clouds);
    }
}


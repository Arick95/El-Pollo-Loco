class Boss extends MovableObject {

    alert_Imagen = [
        'img/4_enemie_boss_chicken/2_alert/G5.png',
        'img/4_enemie_boss_chicken/2_alert/G6.png',
        'img/4_enemie_boss_chicken/2_alert/G7.png',
        'img/4_enemie_boss_chicken/2_alert/G8.png',
        'img/4_enemie_boss_chicken/2_alert/G9.png',
        'img/4_enemie_boss_chicken/2_alert/G10.png',
        'img/4_enemie_boss_chicken/2_alert/G11.png',
        'img/4_enemie_boss_chicken/2_alert/G12.png',
    ]

    Walking_Imagen = [
        'img/4_enemie_boss_chicken/1_walk/G1.png',
        'img/4_enemie_boss_chicken/1_walk/G2.png',
        'img/4_enemie_boss_chicken/1_walk/G3.png',
        'img/4_enemie_boss_chicken/1_walk/G4.png',
    ]

    attack_Imagen = [
        'img/4_enemie_boss_chicken/3_attack/G13.png',
        'img/4_enemie_boss_chicken/3_attack/G14.png',
        'img/4_enemie_boss_chicken/3_attack/G15.png',
        'img/4_enemie_boss_chicken/3_attack/G16.png',
        'img/4_enemie_boss_chicken/3_attack/G17.png',
        'img/4_enemie_boss_chicken/3_attack/G18.png',
        'img/4_enemie_boss_chicken/3_attack/G19.png',
        'img/4_enemie_boss_chicken/3_attack/G20.png',
    ]
    Hurt_Imagen = [
        'img/4_enemie_boss_chicken/4_hurt/G21.png',
        'img/4_enemie_boss_chicken/4_hurt/G22.png',
        'img/4_enemie_boss_chicken/4_hurt/G23.png',
    ]
    dead_Imagen = [
        'img/4_enemie_boss_chicken/5_dead/G24.png',
        'img/4_enemie_boss_chicken/5_dead/G25.png',
        'img/4_enemie_boss_chicken/5_dead/G26.png',
    ]

    x = 8500
    playerIsHere = false;
    isBoss = true;
    i = 0;
    BossAllowToMove = false;
    speed = 20;
    isRight = 8500;
    isLeft = 8100;
    height = 300;
    width = 150;
    y = 150;
    EnemyInterval = [];
    BossAlertIsFinish = false;
    GameIsFinish = false;
    offset = { top: 60, bottom: 0, left: 10, right: 10 }

    constructor() {
        super().loadImage('img/4_enemie_boss_chicken/1_walk/G1.png');
        this.loadImages(this.alert_Imagen);
        this.loadImages(this.Walking_Imagen);
        this.loadImages(this.attack_Imagen);
        this.loadImages(this.Hurt_Imagen);
        this.loadImages(this.dead_Imagen);
        this.animate();
        this.health = 301;
    }

    /**
    * 
    * This function create a interval for the walk animation for Boss behaves.
    * 
    *  @param {boolean} BossAllowToMove - Boss is Allow to move.
    *  @param {boolean} GameIsFinish - Is Game Finish.
    */
    animate() {
        this.EnemyInterval = setInterval(() => {
            this.ruleForBossInterval();
            this.i++
            this.PlayerSeeBoss();
        }, 125);
    }

    /**
    * 
    * This function Start the Interval Rule of the Boss.
    * 
    * 
    */
    ruleForBossInterval() {
        if (this.isDeath) {
            this.ruleForBossisDeath()
        } else if (this.isHurt()) {
            this.ruleForBossIsHurt()
        } else if (this.i < 10) {
            this.ruleForBossAlert()
        } else if (this.BossAllowToMove) {
            if (this.playerIsHere) {
                this.ruleForBossWalking()
            }
        }
    }

    /**
    * 
    * This function Start if the Boss get Die.
    * 
    * 
    */
    ruleForBossisDeath() {
        this.BossAllowToMove = false;
        world.GameIsFinish = true;
        this.playAnimationWalk(this.Hurt_Imagen);
        if (this.i > 5) {
            this.playAnimationWalk(this.dead_Imagen);
            if (!this.GameIsFinish) {
                this.GameIsFinish = true;
                GameIsFinishRule('FinishVictory');
            }
        }
    }

    /**
    * 
    * This function Start if the Boss get hurt.
    * 
    * 
    */
    ruleForBossIsHurt() {
        this.playAnimationWalk(this.Hurt_Imagen);
        this.BossAllowToMove = false;
        this.BossIsWaiting();
    }

    /**
    * 
    * This function Start if the Boss see on screen.
    * 
    */
    ruleForBossAlert() {
        this.BossAllowToMove = false;
        this.BossIsWaiting();
        this.playAnimationWalk(this.alert_Imagen);
    }


    /**
    * 
    * This function Start if the Boss get walk.
    * 
    * 
    */
    ruleForBossWalking() {
        this.playAnimationWalk(this.Walking_Imagen);
        this.restrainedBoss();
    }

    /**
    * 
    * This function Explain how the Boss behaves if the player is close.
    * 
    * @param {boolean} playerIsHere - Check if Player is close on Boss
    */
    PlayerSeeBoss() {
        if (world?.character.x > 8100 && !this.playerIsHere) {
            this.i = 0
            this.playerIsHere = true
            /*  this.detectPlayerInterval();
             this.deletetPlayerInveral(); */
            /* setTimeout(() => {this.playerAllowtoMove()}, 1500) */
        }
    }

    /**
    * 
    * This function Stop the Player to Walk and waiting for the alert the Boss.
    * 
    * @param {boolean} playerIsHere - Check if Player is close on Boss
    */
    playerAllowtoMove() {
        if (world.character.x > 8100 && this.playerIsHere) {
            world.character.walkAnimate();
            world.character.InteractionAnimate();
            world.character.pushInterval();
        }
    }

    /**
    * 
    * This function A I form Boss to chase the Player.
    * 
    * @param {boolean} BossIsMove  - Game check if is the Boss is moving.
    */
    restrainedBoss() {
        if (this.x > world.character.x + 65) {
            this.BossIsMove = true;
            this.moveLeft();
            this.otherDirection = false;
            if (this.x - world.character.x < 75 && this.otherDirection == false) {
                this.BossIsMove = false;
                this.playAnimationWalk(this.attack_Imagen);
            }
        }
        if (this.x < world.character.x - 120) {
            this.BossIsMove = true;
            this.moveRight();
            this.otherDirection = true;
            if (this.x - world.character.x > -175 && this.otherDirection == true) {
                this.BossIsMove = false;
                this.playAnimationWalk(this.attack_Imagen);
            }
        }
    }

    /**
    * 
    * This function stop the Boss to start the Alert function.
    * 
    * @param {boolean} BossAllowToMove - The Boss Waiting for the alert is finish.
    */
    BossIsWaiting() {
        setTimeout(() => {
            this.BossAllowToMove = true;
        }, 750);
    }

    /**
    * 
    * This function create a array which has only the player Character Interval.
    * 
    * @param {string} CharacterInterval - Filter player character Interval.
    */
    detectPlayerInterval() {
        let CharacterInterval = Intervalls.filter(function (Intervall) {
            return Intervall.Name == 'Character';
        });
        for (let index = 0; index < CharacterInterval.length; index++) {
            const element = CharacterInterval[index].IdofInterval;
            clearInterval(element)
        }
    }

    /**
    * 
    * This function delete the Player Character Interval
    * 
    * @param {string} Intervalls - This Interval has only Player character Interval.
    */
    deletetPlayerInveral() {
        Intervalls = Intervalls.filter(function (Intervall) {
            return Intervall.Name !== 'Character';
        });
    }
}
class smallChicken extends MovableObject {

    Walking_Imagen = [
        'img/3_enemies_chicken/chicken_small/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_small/1_walk/3_w.png',
    ]
    death_Imagen = [
        'img/3_enemies_chicken/chicken_small/2_dead/dead.png'
    ]
    height = 50;
    width = 50;

    isSmallChick = true;
    EnemyInterval = [];
    offset = { top: -20, bottom: 0, left: 0, right: 0 }
    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_small/1_walk/1_w.png');
        this.loadImages(this.Walking_Imagen);
        this.loadImages(this.death_Imagen);
        this.speed = 1 + Math.random() * 1.5;
        this.x = 1500 + Math.random() * 6700;
        this.y = 370;
        this.attackDamage = 30;
        this.animate();
    }

    /**
    * 
    * This function create a interval for the walk animation for Smallchicken behaves.
    * 
    * @param {number} EnemyInterval - The Number of the Interval From Small Chicken .
    * @param {boolean} isDeath - Is this Enemy is Death Yes or No.
    * @param {number} attackDamage - Reduce the Attack Damage if the Small Chicken Die to 0
    * @param {boolean} hitPossilble - Can this Small Chicken Attack Yes or No.
    */
    animate() {
        this.EnemyInterval = setInterval(() => {
            if (!this.isDeath == true) {
                this.moveLeft()
                this.otherDirection = false;
                this.playAnimationWalk(this.Walking_Imagen)
            } else {
                this.attackDamage = 0
                this.playAnimationWalk(this.death_Imagen)
                this.hitPossilble = false;
            }
        }, 60);
    }
}
class Chicken extends MovableObject {


    Walking_Imagen = [
        'img/3_enemies_chicken/chicken_normal/1_walk/1_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/2_w.png',
        'img/3_enemies_chicken/chicken_normal/1_walk/3_w.png',
    ]

    death_Imagen = [
        'img/3_enemies_chicken/chicken_normal/2_dead/dead.png'
    ]

    health = 20;
    height = 70;
    width = 70;
    isChicken = true;
    EnemyInterval = [];
    offset = { top: -10, bottom: 0, left: 0, right: 0}

    constructor() {
        super().loadImage('img/3_enemies_chicken/chicken_normal/1_walk/1_w.png');
        this.loadImages(this.Walking_Imagen);
        this.loadImages(this.death_Imagen);
        this.speed = 1 + Math.random() * 1.5;
        this.x = 1500 + Math.random() * 6700;
        this.y = 350;
        this.attackDamage = 30;
        this.animate();
    }
    
   /**
   * 
   * This function create a interval for the walk animation for Chicken behaves.
   * 
   * @param {string} EnemyInterval - turn the Enemy Interval into a Variable.
   */
    animate() {
        this.EnemyInterval = setInterval(() => {
            if (!this.isDeath == true) {
                this.moveLeft()
                this.otherDirection = false;
                this.playAnimationWalk(this.Walking_Imagen)
            } else {
                this.hitPossilble = false;
                this.playAnimationWalk(this.death_Imagen)
                this.attackDamage = 0

            }
        }, 60);
    }
}
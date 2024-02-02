class ThrowableObjects extends MovableObject {
    Rotation_Bottle = [
        'img/6_salsa_bottle/bottle_rotation/1_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/2_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/3_bottle_rotation.png',
        'img/6_salsa_bottle/bottle_rotation/4_bottle_rotation.png',
    ]
    height = 80;
    width = 80;
    speed = 20;
    acceleration = 0;
    speedY = 3;
    camera_x = 3
    hitted = false
    attackDamage = 99;
    offset = { top: 0, bottom: 0, left: 0, right: 0 }

    constructor(x, y, keyboard, otherDirection,) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.loadImages(this.Rotation_Bottle);
        this.x = x;
        this.y = y - 25;
        this.keyboard = keyboard;
        this.otherDirection = otherDirection;
        this.throw();
    }

    /**
    * This function Throw Object
    * 
    * @param {number} percentage - the number in this function update the number of the Imange.
    */
    throw() {
        let throwInterval = setInterval(() => {
            this.speedY -= 0.3;
            if (!this.otherDirection) {
                if (this.keyboard.RIGHT == true) {
                    this.x += 15;
                }
                this.moveRight();
            } else {
                if (this.keyboard.LEFT == true) {
                    this.x -= 15;
                }
                this.moveLeft();
            }
            this.playAnimationWalk(this.Rotation_Bottle);
            this.applyGravity();
        }, 30);
        setTimeout(() => { clearInterval(throwInterval) }, 1500)
    }
}
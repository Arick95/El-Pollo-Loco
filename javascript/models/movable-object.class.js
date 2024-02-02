// Schablone 

class MovableObject extends DrawableObject {

    speed = 0.3
    speedY = 0;
    acceleration = 1;
    health = 20;
    attackDamage = 20;
    lastHit = 0;
    traveled = 0;
    otherDirection = false;
    isDeath = false;
    hitPossilble = true;
    ishitted = true;
    isInCooldown = true;
    isBoss = false;

    /**
     * This function create artificial Gravitiy 
     * 
     * @param {applyGravity()} - artificial Gravitiy
     */
    applyGravity() {
        setInterval(() => {
            if (this.isAboveGround() || this.speedY > 0) {
                this.y -= this.speedY;
                this.speedY -= this.acceleration;
            }
        }, 20)
    }

    /**
    * This function Stop the Player to falling the ground.
    * 
    * @param {isAboveGround()} - Stop the artificial Gravitiy
    */
    isAboveGround() {
        if (this instanceof ThrowableObjects) {
            return true
        } else {
            return this.y < 210;
        }
    }

    /**
    * This function is the Damage Take Function
    * 
    * @param {Number} attackDamage - attackDamage take the AttackDamage from the Object
    */
    hitpoints(attackDamage) {
        this.health = this.health - attackDamage
        if (this.health < 0) {
            this.health = 0;
        } else {
            this.lastHit = new Date().getTime();
        }
    }
    /**
    * 
    * 
    * @param { isDead()} - check is a object Dead
    */
    isDead() {
        return (this.health == 0);
    }

    /**
    * 
    * 
    * @param { isHurt()} - check if a object take Damage
    */
    isHurt() {
        let timePassed = new Date().getTime() - this.lastHit;
        timePassed = timePassed / 1000;
        return timePassed < 1;
    }

    /**
    * This function create a collision for two Objects.
    * 
    * @param {string} mo - (this) is the first Object which use the Function and mo is the variable object for the collision Function
    */
    isColliding(mo) {
        return this.x + this.width - this.offset.right > mo.x + mo.offset.left &&
            this.y + this.height - this.offset.bottom > mo.y + mo.offset.top &&
            this.x + this.offset.left < mo.x + mo.width - mo.offset.right &&
            this.y + this.offset.top < mo.y + mo.height - mo.offset.bottom;
    }

    /**
    * This function create Walk Animation.
    * 
    * @param {string} images - images is a parameter that specifies the number length of the images
    */
    playAnimationWalk(images) {
        let i = this.currentImage % images.length;
        let path = images[i];
        this.img = this.imageCache[path];
        this.currentImage++;
    }

    /**
    * 
    * 
    *  @param {number} speed - how fast can a object move
    */
    moveRight() {
        this.x += this.speed;
        this.otherDirection = false;
    }

    /**
    * 
    * @param {number} speed - how fast can a object move
    */
    moveLeft() {
        this.x -= this.speed;
        this.otherDirection = true;
    }

    /**
    * 
    * @param {number} speedY - How high to jump
    */
    jump() {
        this.speedY = 22;
    }

    /**
    * This Function stop for a short time the object take Damage.
    * 
    * @param {string} entity - entity is the Parameter for Boss and Player
    * @param {boolean} ishitted - Is Object Hitting Yes or No.
    */
    characterIsInvencible(entity) {
        setTimeout(() => {
            entity.ishitted = true
        }, 750);
    }

    /**
    * 
    * 
    * @param {boolean} isInCooldown - give the Throwable Object a cooldown for throwable again.
    */
    ThrowableObjectsCooldown() {
        setTimeout(() => {
            this.isInCooldown = true;
        }, 750);
    }
}
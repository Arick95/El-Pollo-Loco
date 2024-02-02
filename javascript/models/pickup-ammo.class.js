class Ammo extends MovableObject {

    width = 100;
    height = 100;
    offset = { top: 25, bottom: 20, left: 36, right: 36 }

    /**
    * This Constructor loading the Ammo.
    * 
    * @param {number} x - Pace for Ammo
    * 
    */
    constructor(x) {
        super().loadImage('img/6_salsa_bottle/salsa_bottle.png');
        this.x = x * Math.random() + x;
        this.y = 250 - Math.random() * 200;
    }
}
class BackgoundObject extends MovableObject {
    
    width = 720;
    height = 480;

    /**
    * This function show up which Background Imagen is loading.
    * 
    * @param {string} imagePath - the number in this function update the number of the Imange.
    * @param {number} x - the number in this function update the number Position of the Imange.
    */
    constructor(imagePath, x) {
        super().loadImage(imagePath);
        this.x = x - this.width + this.width;
        this.y = 480 - this.height;
    }
}
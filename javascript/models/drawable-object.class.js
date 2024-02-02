class DrawableObject {

    img;
    imageCache = {};
    currentImage = 0;
    x = 70;
    y = 220;
    height = 200;
    width = 100;
    offset = { top: 0, bottom: 0, left: 0, right: 0 }
    draw(ctx) {
        ctx.drawImage(this.img, this.x, this.y, this.width, this.height);
    }

    /**
     * This function create a rectangle for the Objects with (this instanceof)
     * 
     * @param {string} ctx - ctx = canvas.getcontext('2d'); 
     */

    drawFrame(ctx) {
        if (this instanceof ThrowableObjects) {
            ctx.beginPath();
            ctx.lineWidth = "5";
            ctx.strokeStyle = "red";
            const offsetX = this.offset.left;
            const offsetY = this.offset.top;
            ctx.rect(
                this.x + offsetX,
                this.y + offsetY,
                this.width - this.offset.right - offsetX,
                this.height - this.offset.bottom - offsetY  
            );
            ctx.stroke();
        }
    }

    /**
   * 
   * This function loading all Imagens form Objects.
   * 
   * @param {string} path  - path is the Imagen which is loading;
   */
    loadImage(path) {
        this.img = new Image();
        this.img.src = path;
    }

    /**
     * 
     * @param {Array} arr  - ['img/2_character_pepe/2_walk/W-21.png', 'img/2_character_pepe/2_walk/W-22.png', ....]
     */
    loadImages(arr) {
        arr.forEach(path => {
            let img = new Image()
            img.src = path;
            this.imageCache[path] = img;
        });

    }

}


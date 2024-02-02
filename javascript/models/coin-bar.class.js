class coinBar extends DrawableObject {

    showCoins = [
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/0.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/20.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/40.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/60.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/80.png',
        'img/7_statusbars/1_statusbar/1_statusbar_coin/green/100.png',
    ]

    percentage = 0;
    constructor() {
        super();
        this.loadImages(this.showCoins);
        this.x = 5;
        this.y = 70;
        this.width = 210;
        this.height = 60;
        this.setPercentage(0);
    }

     /**
     * This function you can updating the number for the Imagen Coin Bar.
     * 
     * @param {number} percentage - the number in this function update the number of the Imange.
     */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.showCoins[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }
    
    /**
    * This function compares the Precentage with the numbers and return the new number for the Imagen
    * 
    * @param {number} percentage - the number in this function update the number of the Imange.
    */
    resolveImageIndex() {
        if (this.percentage >= 100) {
            return 5;
        } else if (this.percentage > 80) {
            return 4;
        } else if (this.percentage > 60) {
            return 3;
        } else if (this.percentage > 40) {
            return 2;
        } else if (this.percentage > 20) {
            return 1;
        } else {
            return 0;
        }
    }
}
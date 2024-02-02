class statusBar extends DrawableObject {

    PlayerHealthBar = [
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/0.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/20.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/orange/40.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/60.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/80.png',
        'img/7_statusbars/1_statusbar/2_statusbar_health/blue/100.png',

    ]

    percentage = 200;
    constructor() {
        super();
        this.loadImages(this.PlayerHealthBar);
        this.x = 5;
        this.y = 30;
        this.width = 210;
        this.height = 60;
        this.setPercentage(200);
    }

   /**
   * This function updaiting the Player Bar Imagen.
   * 
   * @param {number} percentage - the number in this function update the number of the Imange.
   */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.PlayerHealthBar[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * This function compares the Precentage with the numbers and return the new number for the Imagen
    * 
    * @param {number} percentage - the number in this function update the number of the Imange.
    */
    resolveImageIndex() {
        if (this.percentage == 200) {
            return 5;
        } else if (this.percentage > 160) {
            return 4;
        } else if (this.percentage > 120) {
            return 3;
        } else if (this.percentage > 80) {
            return 2;
        } else if (this.percentage > 40) {
            return 1;
        } else {
            return 0;
        }
    }
}
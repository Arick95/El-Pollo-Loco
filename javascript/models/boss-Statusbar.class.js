class bossBar extends DrawableObject {

    bossHealthBar = [
        'img/7_statusbars/3_icons/icon_health_endboss.png',
        'img/7_statusbars/2_statusbar_endboss/black.png',
        'img/7_statusbars/2_statusbar_endboss/orange.png',
        'img/7_statusbars/2_statusbar_endboss/green.png',
        'img/7_statusbars/2_statusbar_endboss/blue.png',
    ]

    percentage = 300;

    /**
    * This function Draw the Boss Bar.
    * 
    * @param {string} bossHealthBar - the bossHealthBar show how much life the Boss have.
    */
    constructor() {
        super();
        this.loadImages(this.bossHealthBar);
        this.x = 480;
        this.y = 0;
        this.width = 210;
        this.height = 60;
        this.setPercentage(300);
    }

    /**
    * This function updating the number for the Imagen Boss Bar.
    * 
    * @param {number} percentage - the number in this function update the number of the Imange.
    */
    setPercentage(percentage) {
        this.percentage = percentage;
        let path = this.bossHealthBar[this.resolveImageIndex()];
        this.img = this.imageCache[path];
    }

    /**
    * This function compares the Precentage with the numbers and return the new number for the Imagen and change if needed the imagen size.
    * 
    * @param {number} percentage -  the number in this function update the number of the Imange.
    */
    resolveImageIndex() {
        if (this.percentage >= 300) {
            return 4;
        } else if (this.percentage >= 200) {
            return 3;
        } else if (this.percentage >= 100) {
            return 2;
        } else if (this.percentage <= 100) {
            return 1;
        } else if(this.percentage <= 0);
        {
            this.x = 600;
            this.height = 70;
            this.width = 70;
            return 0;
        }
    }

}
class Coin extends MovableObject {

    Pulsive_Imagen = [
        'img/8_coin/coin_1.png',
        'img/8_coin/coin_2.png',
    ]

    offset = { top: 25, bottom: 25, left: 25, right: 25}
    width = 100;
    height = 100;

  /**
   * 
   * This function loading the Coin Imagen.
   * 
   */
    constructor(x) {
        super().loadImage('img/8_coin/coin_1.png');
        this.loadImages(this.Pulsive_Imagen);
        this.x = x * Math.random() + x;
        this.y = 250 - Math.random() * 200;
    }
}
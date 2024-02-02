class Level {
    enemies;
    clouds;
    BackgoundObjects;
    Coin;
    level_end_x = 9100;

     /**
     * This Constructor loading all level Objects for the Game.
     * 
     * @param {Array} enemies - The Array for the Enemies.
     * @param {Array} clouds - The Array for the Clouds.
     * @param {Array} BackgoundObjects -The Array for the BackgoundObjects.
     * @param {Array} Coin -The Array for the Coins.
     * @param {Array} Ammo -The Array for the Ammos.
     */
    constructor(enemies, clouds, BackgoundObjects, Coin, Ammo) {
        this.enemies = enemies;
        this.clouds = clouds;
        this.BackgoundObjects = BackgoundObjects;
        this.Coin = Coin;
        this.Ammo = Ammo;      
    }
}
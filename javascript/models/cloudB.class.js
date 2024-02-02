class CloudB extends MovableObject {

    constructor() {
        super().loadImage('img/5_background/layers/4_clouds/2.png');
        this.x = 0 + Math.random() * 9000;
        this.y = 10 + Math.random() * 50;
        this.height = 200 + Math.random() * 100;
        this.width = 300 + Math.random() * 100;
        this.speed = 0.1 + Math.random() * 0.5;

        this.animate();
    }

    /**
   * 
   * This function create a interval for the walk animation for Cloud behaves.
   * 
   */
    animate() {
      setInterval(() => {
        this.moveLeft()
    }, 60);
    }
}
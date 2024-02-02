let canvas;
let world;
let keyboard = new Keyboard();
let Intervalls = []
let GameIsReadyToStop = true;
let numb = 0;

/**
 * This function Starting this Game.
 * 
 * @param {string} canvas - Load the Canvas.
 * @param {string} world - Create the World.
 */
function init() {
    canvas = document.getElementById('canvas');
    world = new World(canvas, keyboard);
    this.loadingTheNumbersOfEnemy();
    this.GamePause();
    this.bindBtsPressEvents();
}

/**
* This function Loading the Number Of Enemy Interval.
* 
* @param {number} EnemyInterval - The Interval Number of Emenies
*/
function loadingTheNumbersOfEnemy() {
    world.level.enemies.forEach(Enemy => {
        if (Enemy.isBoss) {
            EnemyInterval = Enemy.EnemyInterval;
            this.IntervalofTheGame('BossChicken', EnemyInterval)
        }
        if (Enemy.isChicken) {
            EnemyInterval = Enemy.EnemyInterval;
            this.IntervalofTheGame('Chicken', EnemyInterval)
        }
        if (Enemy.isSmallChick) {
            EnemyInterval = Enemy.EnemyInterval;
            this.IntervalofTheGame('smallChicken', EnemyInterval)
        }
    });
}

/**
* This function Push the Interval Number to the Interval Array.
* 
* @param {string} Name - the Name of the Interval.
* @param {number} IdofInterval - the Number of the Interval.
*/
function IntervalofTheGame(Name, IdofInterval) {
    Intervalls.push({
        Name, IdofInterval
    })
}

/**
* This function check if the Game is Finish.
* 
* @param {boolean} GameIsFinish - Game is Finish.
*/
function BlockGamePauseFunction() {
    if (!world.GameIsFinish) {
        this.GamePause();
    }
}

/**
* This function is the Rule if the game is Finish.
* 
* @param {string} Chose - Adding the Victory or the Lose Imagen.
*/
function GameIsFinishRule(Chose) {
    setTimeout(() => {
        canvas.classList.add('d-none');
        document.getElementById('MenuImagen').classList.add('d-none');
        document.getElementById(`${Chose}`).classList.remove('d-none');
        world.GameIsFinish = true
    }, 1000)
}

/**
* This function Create the Resett Function of the Game.
* 
* @param {string} Chose - this Remove the Vicotry or the Lose Imagen.
*/
function ResetTheGame(Chose) {
    world.backgroundmusic.pause();
    world.chickenSound.pause();
    this.ResetEnemyArray();
    this.ClearAllIntervallofEnitiy();
    this.ResetruleofEnemy();
    this.ResetStatusbar();
    this.ResetPickups();
    world.throwableObjects = [];
    Intervalls = [];
    world = new World(canvas, keyboard);
    this.ClearAllIntervallofEnitiy();
    this.run();
    GameIsReadyToStop = true
    canvas.classList.remove('d-none');
    document.getElementById('MenuImagen').classList.add('d-none');
    document.getElementById(`${Chose}`).classList.add('d-none');
}

/**
* This function Reset the Enemies of the Game.
* 
*/
function ResetEnemyArray() {
    world.level.enemies = [];
    world.level.enemies = [
        new Chicken(),
        new Chicken(),
        new smallChicken(),
        new Chicken(),
        new Chicken(),
        new smallChicken(),
        new Chicken(),
        new Chicken(),
        new smallChicken(),
        new smallChicken(),
        new Boss(),
    ]
}

/**
* This function Reset the Position of the Enemey and Reset all Boss boolean.
* 
*/
function ResetruleofEnemy() {
    world.level.enemies.forEach(Enemy => {
        if (Enemy.isChicken || Enemy.isSmallChick) {
            Enemy.speed = 1 + Math.random() * 1.5;
            Enemy.x = 1500 + Math.random() * 6700;
            Enemy.health = 20;
            Enemy.EnemyInterval = [];
        }
        if (Enemy.isBoss) {
            Enemy.x = 8500
            Enemy.playerIsHere = false;
            Enemy.i = 0;
            Enemy.BossAllowToMove = false;
            Enemy.EnemyInterval = [];
            Enemy.BossAlertIsFinish = false;
            Enemy.GameIsFinish = false;
        }
    });
}

/**
* This function Reset the all Status Bar .
* 
* @param {number} percentage - Is the Number of the how much the Status Bar are filled.
*/
function ResetStatusbar() {
    world.statusBar.percentage = 200;
    world.bossBar.percentage = 300;
    world.coinBar.percentage = 0;
    world.ammoBar.percentage = 0;
}

/**
* This function Reset the Position of Pickup Objects.
* 
*/
function ResetPickups() {
    world.level.Ammo = [];
    world.level.Ammo = [
        new Ammo(719 * 3.2),
        new Ammo(319 * 4.4),
        new Ammo(519 * 6.3),
        new Ammo(619 * 7.8),
        new Ammo(119 * 9.5),
    ]
    world.level.Coin = [];
    world.level.Coin = [
        new Coin(719 * 3.2),
        new Coin(219 * 4.4),
        new Coin(419 * 6.3),
        new Coin(319 * 7.8),
        new Coin(219 * 9.5),
    ]
}

/**
* This function Stop all the Interval form Intervalls Array
* 
* @param {Array} Intervalls - { Character:38,  Boss:11  }
*/
function ClearAllIntervallofEnitiy() {
    Intervalls.forEach(Interval => {
        clearInterval(Interval.IdofInterval);
    });
}

/**
* This function adding a Game Stop Function and loading a Stop Imagen.
* 
* @param {boolean} GameIsReadyToStop - Check if the Game is Stoping or not.
*/
function GamePause() {
    if (GameIsReadyToStop) {
        GameIsReadyToStop = false;
        world.soundEnable = false;
        world.backgroundmusic.pause();
        world.chickenSound.pause();
        canvas.classList.add('d-none');
        document.getElementById('MenuImagen').classList.remove('d-none');
        this.ClearAllIntervallofEnitiy()
    } else if (!GameIsReadyToStop) {
        world.soundEnable = true;
        this.run();
        this.ResettBooleOfGameIsReadyToStop();
        canvas.classList.remove('d-none');
        document.getElementById('MenuImagen').classList.add('d-none');
    }
}

/**
 * This function allow only one times to use the Stop Key in a second.
 * 
 */
function ResettBooleOfGameIsReadyToStop() {
    setTimeout(() => { GameIsReadyToStop = true }, 100);
}

/**
 * This function Restart the Functions after Game over or Game Pause and delete the old Interval Numbers + adding new Interval Numbers.
 * 
 */
function run() {
    Intervalls = [];
    world.character.walkAnimate();
    world.character.InteractionAnimate();
    world.character.pushInterval();
    world.worldInterval();
    world.level.enemies.forEach(Enemy => {
        Enemy.EnemyInterval = [];
        Enemy.animate();
    });
    this.loadingTheNumbersOfEnemy();
}

/**
* 
* This function Open the Indrodutions.
*/
function OpenIndrodution() {
    document.getElementById('MenuImagen').classList.add('d-none');
    document.getElementById('IntroductionImagen').classList.remove('d-none');
    document.getElementById('CloseIndrodutionBtn').classList.remove('d-none');
}

/**
* 
* This function Close the Indrodutions.
*/
function CloseIndrodution() {
    document.getElementById('MenuImagen').classList.remove('d-none');
    document.getElementById('IntroductionImagen').classList.add('d-none');
    document.getElementById('CloseIndrodutionBtn').classList.add('d-none');
}

/**
* 
* This function abal the sound in Game.
* 
* @param {boolean} soundEnabel - Sound Playing or not.
*/
function EnableSounds() {
    if (world.soundEnabel) {
        document.getElementById('MusicBtn').classList.add('musicButtonTransparent');
        world.soundEnabel = false;
        world.backgroundmusic.pause();
        world.chickenSound.pause();
    } else {
        document.getElementById('MusicBtn').classList.remove('musicButtonTransparent');
        world.soundEnabel = true;
    }
}

/**
* 
* 
* This function allow to use the KeyBoard Controll in Game.
* @param {boolean} keydown - If the Key is Press Down
* 
*/
window.addEventListener('keydown', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }
    if (e.keyCode == 38) {
        keyboard.UP = true;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }
    if (e.keyCode == 68) {
        keyboard.D = true;
    }
    if (e.keyCode == 27) {
        keyboard.ESC = true;
        this.BlockGamePauseFunction();

    }
});

/**
* 
* 
* This function allow to use the KeyBoard Controll in Game.
* @param {boolean} keydown - If the Key is Press Up.
* 
*/
window.addEventListener('keyup', (e) => {
    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }
    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }
    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }
    if (e.keyCode == 38) {
        keyboard.UP = false;
    }
    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }
    if (e.keyCode == 68) {
        keyboard.D = false;
    }
    if (e.keyCode == 27) {
        keyboard.ESC = false;
    }
});

/**
* 
* This function allow to use the Press Buttons for Mobile Vision.
* 
* @param {boolean} touchstart - If the Button is Touching True.
* @param {boolean} touchend - If the Button is Touching false.
* 
*/
function bindBtsPressEvents() {

    document.getElementById('btnLeft').addEventListener("touchstart", (e) => {

        keyboard.LEFT = true;
    }, { passive: true });

    document.getElementById('btnLeft').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.LEFT = false;
    },);

    document.getElementById('btnRight').addEventListener("touchstart", (e) => {

        keyboard.RIGHT = true;
    }, { passive: true });

    document.getElementById('btnRight').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.RIGHT = false;
    },);

    document.getElementById('btnUP').addEventListener("touchstart", (e) => {

        keyboard.UP = true;
    }, { passive: true });

    document.getElementById('btnUP').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.UP = false;
    },);

    document.getElementById('btnD').addEventListener("touchstart", (e) => {

        keyboard.D = true;
    }, { passive: true });

    document.getElementById('btnD').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.D = false;
    },);

    document.getElementById('btnESC').addEventListener("touchstart", (e) => {

        keyboard.ESC = true;
        this.BlockGamePauseFunction();
    }, { passive: true });

    document.getElementById('btnESC').addEventListener("touchend", (e) => {
        e.preventDefault();
        keyboard.ESC = false;
    },);
}


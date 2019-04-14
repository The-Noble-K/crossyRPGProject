// SCENE
let gameScene = {};

function init(){
    this.playerSpeed = 2.5;
    this.enemyMinSpeed = 1;
    this.enemyMaxSpeed = 4;
    this.enemyMinY = 80;
    this.enemyMaxY = 280;
    this.isTerminating = false;
}

function preload (){
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
    this.load.image('enemy', 'assets/dragon.png');
    this.load.image('treasure', 'assets/treasure.png');
}

function create (){
    //Background
    let background = this.add.sprite(0, 0, 'background');
    let gameW = this.sys.game.config.width;
    let gameH = this.sys.game.config.height;
    background.setPosition(gameW/2, gameH/2);
    
    //Player
    this.player = this.add.sprite(40, this.sys.game.config.height/2, 'player');
    this.player.setScale(.5);
    
    //Treasure
    this.goal = this.add.sprite(this.sys.game.config.width-80, this.sys.game.config.height/2, 'treasure');
    this.goal.setScale(.6);
    
    //Group
    this.enemies = this.add.group({
        key: 'enemy',
        repeat: 5,
        setXY: {
        x: 90,
        y: 100,
        stepX: 80,
        stepY: 20,
        }
    });
    Phaser.Actions.ScaleXY(this.enemies.getChildren(), -0.4, -0.4);
    Phaser.Actions.Call(this.enemies.getChildren(), function(enemy){
        enemy.flipX = true;
        let vel = Math.random() < 0.5 ? 1 : -1;
        let speed = this.enemyMinSpeed + Math.random() * (this.enemyMaxSpeed - this.enemyMinSpeed);
        enemy.speed = vel * speed;
    }, this)
    
    

    console.log(this.enemy);
    console.log(this.enemies);
}

function update(){
    //Check for Termination
    if(this.isTerminating) return;
    
    //Player Movement
    if(this.input.activePointer.isDown) {
        this.player.x += this.playerSpeed;
    }
    
    //Goal Detection
    let playerRect = this.player.getBounds();
    let goalRect = this.goal.getBounds();
    if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, goalRect)) {
        return this.scene.restart;
    }
    
    //Get Enemies
    let enemies = this.enemies.getChildren();
    let numEnemies = enemies.length;
    
    //Dragon Movement
    for (let i = 0; i < numEnemies; i++) {
        enemies[i].y += enemies[i].speed;
        let conditionUp = enemies[i].speed < 0 && enemies[i].y <= this.enemyMinY;
        let conditionDown = enemies[i].speed > 0 && enemies[i].y >= this.enemyMaxY;
    
        if (conditionUp || conditionDown){
            enemies[i].speed *= -1;
        };
        
        let enemyRect = enemies[i].getBounds();
        if (Phaser.Geom.Intersects.RectangleToRectangle(playerRect, enemyRect)) {
            return this.scene.restart();
        }; 
    }
}

//CONFIGURATION
const config = {
    type: Phaser.AUTO,
    parent: 'phaser-game',
    width: 640,
    height: 360,
    scene: {
        init,
        preload,
        create,
        update,
        gameOver,
    }
};
//NEW GAME
const game = new Phaser.Game(config);
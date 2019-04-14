import 'js/phaser.js';
// SCENE
let gameScene = new Phaser.scene('Game');

gameScene.preload = function(){
    this.load.image('background', 'assets/background.png');
    this.load.image('player', 'assets/player.png');
}
gameScene.create = function(){
    this.add.sprite(0, 0, 'background');
}
//CONFIGURATION
let config = {
    type: Phaser.AUTO,
    width: 640,
    height: 360,
    scene: gameScene
};
//NEW GAME
let game = new Phaser.game(config);
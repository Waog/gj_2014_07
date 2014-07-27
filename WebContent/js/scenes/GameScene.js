Scene.GameScene = function(game) {
};
Scene.GameScene.prototype = {
    preload : function() {
        this.load.image('gameBg', 'assets/img/backgrond600x6k.png');
        Scorpion.preload(this);
        Player.preload(this);
        this.load.image('player2', 'assets/img/alien01.png');
        this.load.image('shield1', 'assets/img/shield01.png');
        this.load.image('shield2', 'assets/img/shield02.png');
        this.load.image('ship', 'assets/img/spaceship.png');

        this.game.load.audio('hit', utils
            .getAudioFileArray('assets/placeholder/fx/hit'));
        this.hitSound = this.game.add.audio('hit');

        this.game.gameplayMusic.play();
    },

    create : function() {
        this.game.physics.startSystem(Phaser.Physics.P2JS);
        this.game.physics.p2.restitution = 0.9;

        this.game.scorpionCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.shieldCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.game.shipCollisionGroup = this.game.physics.p2.createCollisionGroup();

        this.bg = this.add.sprite(0, 0, "gameBg");
        this.bg.width = this.game.world.width;
        this.bg.height = this.game.world.height;

        var tutorialString = "player 1: asdw\nplayer 2: arrow keys\nprotect each other!";
        this.game.add.text(10, 10, tutorialString);

        this.scorpion = new Scorpion(800, 200, this.game, this);

        this.player1 = new Player(this, 1, this.onLose, this);

        this.shield1 = this.add.sprite(this.player1.sprite.x, this.player1.sprite.y, "shield1");
        this.shield1.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.shield1, true);
        this.shield1.body.setRectangle(15, 70, 40, 0);
        this.shield1.body.setCollisionGroup(this.game.shieldCollisionGroup);
        this.shield1.body.collides(this.game.scorpionCollisionGroup, this.scorpion.kill, this.scorpion);

        this.player2 = this.add.sprite(30, 300, "player2");
        this.player2.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.player2);
        this.player2.body.setCollisionGroup(this.game.playerCollisionGroup);
        this.player2.body.collides(this.game.scorpionCollisionGroup, this.onLose, this);

        this.shield2 = this.add.sprite(this.player2.x, this.player2.y, "shield2");
        this.shield2.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.shield2);
        this.shield2.body.setRectangle(15, 70, 40, 0);
        this.shield2.body.setCollisionGroup(this.game.shieldCollisionGroup);
        this.shield2.body.collides(this.game.scorpionCollisionGroup, this.scorpion.kill, this.scorpion);

        this.ship = this.add.sprite(600, 200, "ship");
        this.ship.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.ship);
        this.ship.body.setCollisionGroup(this.game.shipCollisionGroup);
        this.ship.body.collides(this.game.playerCollisionGroup, this.onWin, this);

        this.upKey1 = this.game.input.keyboard.addKey(Phaser.Keyboard.W);
        this.downKey1 = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
        this.leftKey1 = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
        this.rightKey1 = this.game.input.keyboard.addKey(Phaser.Keyboard.D);

        this.upKey2 = this.game.input.keyboard.addKey(Phaser.Keyboard.UP);
        this.downKey2 = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
        this.leftKey2 = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
        this.rightKey2 = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);

        this.game.physics.p2.setImpactEvents(true);
    },

    update : function() {

// player 1 control
this.x1TurnDirection;
this.y1TurnDirection;

if (this.upKey1.isDown)
{
    this.player1.sprite.body.y--;
    this.y1TurnDirection = -1000;
}
else if (this.downKey1.isDown)
{
    this.player1.sprite.body.y++;
    this.y1TurnDirection = 1000;
} else {
    this.y1TurnDirection = 0;
}

if (this.leftKey1.isDown)
{
    this.player1.sprite.body.x--;
    this.x1TurnDirection = -1000;
}
else if (this.rightKey1.isDown)
{
    this.player1.sprite.body.x++;
    this.x1TurnDirection = 1000;
} else {
    this.x1TurnDirection = 0;
}

// player 2 control
this.x2TurnDirection;
this.y2TurnDirection;

if (this.upKey2.isDown)
{
    this.player2.body.y--;
    this.y2TurnDirection = -1000;
}
else if (this.downKey2.isDown)
{
    this.player2.body.y++;
    this.y2TurnDirection = 1000;
}
else {
    this.y2TurnDirection = 0;
}

if (this.leftKey2.isDown)
{
    this.player2.body.x--;
    this.x2TurnDirection = -1000;
}
else if (this.rightKey2.isDown)
{
    this.player2.body.x++;
    this.x2TurnDirection = 1000;
}
else {
    this.x2TurnDirection = 0;
}

if (this.x1TurnDirection !== 0 || this.y1TurnDirection !== 0) {
    this.player1.sprite.body.rotation = this.game.physics.arcade.angleToXY(this.player1.sprite, this.player1.sprite.x + this.x1TurnDirection + 1, this.player1.sprite.y + this.y1TurnDirection + 1);
    this.player1.sprite.body.rotation += Math.PI / 2;
}

if (this.x2TurnDirection !== 0 || this.y2TurnDirection !== 0) {
    this.player2.body.rotation = this.game.physics.arcade.angleToXY(this.player2, this.player2.x + this.x2TurnDirection + 1, this.player2.y + this.y2TurnDirection + 1);
    this.player2.body.rotation += Math.PI / 2;
}

this.shield1.body.x = this.player1.sprite.x;
this.shield1.body.y = this.player1.sprite.y;
this.shield1.body.rotation = this.game.physics.arcade.angleToXY(this.player1.sprite, this.player2.x, this.player2.y);
this.shield1.body.rotation += Math.PI;


this.shield2.body.x = this.player2.x;
this.shield2.body.y = this.player2.y;
this.shield2.body.rotation = this.game.physics.arcade.angleToXY(this.player2, this.player1.sprite.x, this.player1.sprite.y);
this.shield2.body.rotation += Math.PI;

this.scorpion.update(this.player1.sprite);
},

onWin : function() {
    this.hitSound.play();
    this.game.state.start('Win');
},

onLose : function() {
    this.hitSound.play();
    this.game.state.start('Lose');
},

shutdown : function() {
    this.game.gameplayMusic.stop();
},

render : function() {
}
};
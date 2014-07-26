Scene.GameScene = function(game) {
};
Scene.GameScene.prototype = {
    preload : function() {
        this.load.image('gameBg', 'assets/img/backgrond600x6k.png');
        this.load.image('scorpion', 'assets/img/scorpion.png');
        this.load.image('player1', 'assets/img/alien01.png');
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


        this.bg = this.add.sprite(0, 0, "gameBg");
        this.bg.width = this.game.world.width;
        this.bg.height = this.game.world.height;

        var tutorialString = "player 1: asdw\nplayer 2: arrow keys\nprotect each other!";
        this.game.add.text(10, 10, tutorialString);

        
        this.playerCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.shieldCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.scorpionCollisionGroup = this.game.physics.p2.createCollisionGroup();
        this.shipCollisionGroup = this.game.physics.p2.createCollisionGroup();

        this.scorpion = this.add.sprite(800, 200, "scorpion");
        this.addPhysicsMovmentAndColision(this.scorpion);

        this.player1 = this.add.sprite(30, 100, "player1");
        this.player1.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.player1, true);
        this.player1.body.setCollisionGroup(this.playerCollisionGroup);
        this.player1.body.collides(this.scorpionCollisionGroup, this.onLose, this);

        this.shield1 = this.add.sprite(this.player1.x, this.player1.y, "shield1");
        this.shield1.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.shield1, true);
        this.shield1.body.setRectangle(15, 70, 40, 0);
        this.shield1.body.setCollisionGroup(this.shieldCollisionGroup);
        this.shield1.body.collides(this.scorpionCollisionGroup, this.killScorpion, this);

        this.player2 = this.add.sprite(30, 300, "player2");
        this.player2.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.player2, true);
        this.player2.body.setCollisionGroup(this.playerCollisionGroup);
        this.player2.body.collides(this.scorpionCollisionGroup, this.onLose, this);

        this.shield2 = this.add.sprite(this.player2.x, this.player2.y, "shield2");
        this.shield2.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.shield2, true);
        this.shield2.body.setRectangle(15, 70, 40, 0);
        this.shield2.body.setCollisionGroup(this.shieldCollisionGroup);
        this.shield2.body.collides(this.scorpionCollisionGroup, this.killScorpion, this);

        this.ship = this.add.sprite(600, 200, "ship");
        this.ship.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.ship, true);
        this.ship.body.setCollisionGroup(this.shipCollisionGroup);
        this.ship.body.collides(this.playerCollisionGroup, this.onWin, this);

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
        if (this.upKey1.isDown)
        {
            this.player1.body.y--;
        }
        else if (this.downKey1.isDown)
        {
            this.player1.body.y++;
        }

        if (this.leftKey1.isDown)
        {
            this.player1.body.x--;
        }
        else if (this.rightKey1.isDown)
        {
            this.player1.body.x++;
        }

// player 2 control
        if (this.upKey2.isDown)
        {
            this.player2.body.y--;
        }
        else if (this.downKey2.isDown)
        {
            this.player2.body.y++;
        }

        if (this.leftKey2.isDown)
        {
            this.player2.body.x--;
        }
        else if (this.rightKey2.isDown)
        {
            this.player2.body.x++;
        }

        this.shield1.body.x = this.player1.x;
        this.shield1.body.y = this.player1.y;
        this.shield1.body.rotation = this.game.physics.arcade.angleToXY(this.player1, this.player2.x, this.player2.y);
        this.shield1.body.rotation += Math.PI;


        this.shield2.body.x = this.player2.x;
        this.shield2.body.y = this.player2.y;
        this.shield2.body.rotation = this.game.physics.arcade.angleToXY(this.player2, this.player1.x, this.player1.y);
        this.shield2.body.rotation += Math.PI;

        this.SCORPION_SPEED = 50;
        this.scorpion.body.rotation = this.game.physics.arcade.angleToXY(this.scorpion, this.player1.x, this.player1.y);
        this.scorpion.body.velocity.x = Math.cos(this.scorpion.body.rotation) * this.SCORPION_SPEED;
        this.scorpion.body.velocity.y = Math.sin(this.scorpion.body.rotation) * this.SCORPION_SPEED;
    },
    
    onWin : function() {
        this.hitSound.play();
        this.game.state.start('Win');
    },

    onLose : function() {
        this.hitSound.play();
        this.game.state.start('Lose');
    },

    addPhysicsMovmentAndColision : function(sprite) {
        this.game.physics.p2.enable(sprite, true);
        sprite.body.setCollisionGroup(this.scorpionCollisionGroup);
        sprite.body.collides([this.shieldCollisionGroup, this.playerCollisionGroup]);
    },

    addInputHandler : function(sprite, callback) {
        sprite.inputEnabled = true;
        sprite.events.onInputDown.add(callback, this);
    },
    
    shutdown : function() {
        this.game.gameplayMusic.stop();
    },

    render : function() {
    },

    killScorpion : function() {
        var xOffset = this.getRandomInt(-500, 500);
        var yOffset = this.getRandomInt(-500, 500);
        var rndCorner = this.getRandomInt(1, 4);
        if (rndCorner == 1) {
            xOffset = -500;
        } else if (rndCorner == 2) {
            xOffset = 500;
        } else if (rndCorner == 3) {
            yOffset = -500;
        } else if (rndCorner == 4) {
            yOffset = 500;
        } 

        this.scorpion.body.x = this.player1.x + xOffset; 
        this.scorpion.body.y = this.player1.y + yOffset;
    },

    /**
 * Returns a random number between min (inclusive) and max (exclusive)
 */
getRandomArbitrary : function(min, max) {
    return Math.random() * (max - min) + min;
},

/**
 * Returns a random integer between min (inclusive) and max (inclusive)
 * Using Math.round() will give you a non-uniform distribution!
 */
getRandomInt : function (min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
};
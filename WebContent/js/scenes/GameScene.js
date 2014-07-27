Scene.GameScene = function(game) {
};
Scene.GameScene.prototype = {
    preload : function() {
        this.load.image('gameBg', 'assets/img/backgrond600x6k.png');
        Scorpion.preload(this);
        Player.preload(this);
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
        this.player2 = new Player(this, 2, this.onLose, this);

        this.shield1 = this.add.sprite(this.player1.sprite.x, this.player1.sprite.y, "shield1");
        this.shield1.anchor.setTo(0.5, 0.5);
        this.game.physics.p2.enable(this.shield1, true);
        this.shield1.body.setRectangle(15, 70, 40, 0);
        this.shield1.body.setCollisionGroup(this.game.shieldCollisionGroup);
        this.shield1.body.collides(this.game.scorpionCollisionGroup, this.scorpion.kill, this.scorpion);

        this.shield2 = this.add.sprite(this.player2.sprite.x, this.player2.sprite.y, "shield2");
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

        this.game.physics.p2.setImpactEvents(true);
    },

    update : function() {
        this.player1.update();
        this.player2.update();

        this.shield1.body.x = this.player1.sprite.x;
        this.shield1.body.y = this.player1.sprite.y;
        this.shield1.body.rotation = this.game.physics.arcade.angleToXY(this.player1.sprite, this.player2.sprite.x, this.player2.sprite.y);
        this.shield1.body.rotation += Math.PI;

        this.shield2.body.x = this.player2.sprite.x;
        this.shield2.body.y = this.player2.sprite.y;
        this.shield2.body.rotation = this.game.physics.arcade.angleToXY(this.player2.sprite, this.player1.sprite.x, this.player1.sprite.y);
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
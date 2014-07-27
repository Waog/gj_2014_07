Scene.GameScene = function(game) {
};
Scene.GameScene.prototype = {
    preload : function() {
        this.load.image('gameBg', 'assets/img/backgrond600x6k.png');
        Scorpion.preload(this);
        Player.preload(this);
        Shield.preload(this);

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
        this.shield1 = new Shield(this, this.scorpion, this.player1, this.player2);

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
        this.shield1.update();

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
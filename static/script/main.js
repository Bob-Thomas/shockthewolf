var
    dimensions = [window.innerWidth, window.innerHeight],
    game = new Phaser.Game(dimensions[0], dimensions[1], Phaser.AUTO, 'game'),
    Main = function () {
    },
    gameOptions = {
        playSound: true,
        playMusic: true
    },
    musicPlayer
    ;

Main.prototype = {

    preload: function () {
        game.load.image('stars', '/static/assets/images/stars.jpg');
        game.load.image('loading', '/static/assets/images/loading.png');
        game.load.script('utils', '/static/script/lib/utils.js');
        game.load.script('splash', '/static/script/states/Splash.js');
    },

    create: function () {
        //create stuff
        game.state.add('Splash', Splash);
        game.state.start('Splash')
    }
};

game.state.add('Main', Main);
game.state.start('Main');


//var game = new Phaser.Game(800, 600, Phaser.AUTO, '', {preload: preload, create: create, update: update});
//
//function preload() {
//    game.load.image('sky', '/static/images/sky.png');
//    game.load.image('ground', '/static/images/platform.png');
//    game.load.image('star', '/static/images/star.png');
//    game.load.spritesheet('dude', '/static/images/dude.png', 32, 48);
//}
//
//
//var platforms;
//var player;
//var cursors;
//var stars;
//var score = 0;
//var scoreText;
//var playerName = "endargon";
//var playerTag;
//var otherPlayers = [];
//
//function getRandomInt(min, max) {
//    return Math.floor(Math.random() * (max - min + 1)) + min;
//}
//
//
//function create() {
//    game.physics.startSystem(Phaser.Physics.ARCADE);
//    cursors = game.input.keyboard.createCursorKeys();
//    game.add.sprite(0, 0, 'sky');
//    scoreText = game.add.text(16, 16, 'score: 0', {font: '32px Arial', fill: '#000'});
//
//    platforms = game.add.group();
//    platforms.enableBody = true;
//
//    var ground = platforms.create(0, game.world.height - 64, 'ground');
//    ground.scale.setTo(2, 2);
//
//    ground.body.immovable = true;
//
//    var ledge = platforms.create(400, 400, 'ground');
//
//    ledge.body.immovable = true;
//
//    ledge = platforms.create(-150, 250, 'ground');
//
//    ledge.body.immovable = true;
//
//
//    //player
//    player = game.add.sprite(32, game.world.height - 150, 'dude');
//    game.physics.arcade.enable(player);
//
//    player.body.bounce.y = 0.2;
//    player.body.gravity.y = 300;
//    player.body.collideWorldBounds = true;
//    player.animations.add('left', [0, 1, 2, 3], 10, true);
//    player.animations.add('right', [5, 6, 7, 8], 10, true);
//
//    playerTag = game.add.text(player.position.x, player.position.y, playerName, {font: '12px Arial', fill: '#ffff'});
//
//    for (var i = 0; i < 10; i++) {
//        var durp = game.add.sprite(getRandomInt(0, game.world.width), (game.world.height-getRandomInt(0, game.world.height)) - 150, 'dude');
//        game.physics.arcade.enable(durp);
//
//        durp.body.bounce.y = 0.2;
//        durp.body.gravity.y = 300;
//        durp.body.collideWorldBounds = true;
//        durp.animations.add('left', [0, 1, 2, 3], 10, true);
//        durp.animations.add('right', [5, 6, 7, 8], 10, true);
//        otherPlayers.push(durp)
//    }
//
//    stars = game.add.group();
//
//    stars.enableBody = true;
//
//    //  Here we'll create 12 of them evenly spaced apart
//    for (var i = 0; i < 12; i++) {
//        //  Create a star inside of the 'stars' group
//        var star = stars.create(i * 70, 0, 'star');
//
//        //  Let gravity do its thing
//        star.body.gravity.y = 300;
//
//        //  This just gives each star a slightly random bounce value
//        star.body.bounce.y = 0.7 + Math.random() * 0.2;
//    }
//
//
//}
//
//function collectStar(player, star) {
//    star.kill();
//    //  Add and update the score
//    score += 10;
//    scoreText.text = 'Score: ' + score;
//}
//function update() {
//    game.physics.arcade.collide(player, platforms);
//    game.physics.arcade.collide(stars, platforms);
//    game.physics.arcade.collide(player, stars, collectStar, null, this);
//
//    player.body.velocity.x = 0;
//    playerTag.position.x = player.body.x - 6;
//    playerTag.position.y = player.body.y - 6;
//    if (cursors.left.isDown) {
//        player.body.velocity.x = -150;
//        player.animations.play('left')
//    }
//    else if (cursors.right.isDown) {
//        player.body.velocity.x = 150;
//        player.animations.play('right')
//    }
//    else {
//        player.animations.stop();
//        player.frame = 4;
//    }
//
//    //  Allow the player to jump if they are touching the ground.
//    if (cursors.up.isDown && player.body.touching.down) {
//        player.body.velocity.y = -350;
//    }
//
//    for (var i = 0; i < otherPlayers.length; i++) {
//        var user = otherPlayers[i];
//        game.physics.arcade.collide(user, player);
//        game.physics.arcade.collide(user, platforms);
//        game.physics.arcade.collide(user, platforms);
//        game.physics.arcade.collide(user, stars, collectStar, null, this);
//
//    }
//
//}
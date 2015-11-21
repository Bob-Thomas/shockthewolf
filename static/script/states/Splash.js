var Splash = function () {
    },
    playSound = true,
    playMusic = true,
    music;
Splash.prototype = {

    loadScripts: function () {
        game.load.script('utils', '/static/script/vendor/webfontloader.js');
        game.load.script('mixins', '/static/script/lib/mixins.js');
        game.load.script('style', '/static/script/lib/style.js');
        game.load.script('splash', '/static/script/states/Options.js');
        game.load.script('game', '/static/script/states/GameMenu.js');
        game.load.script('options', '/static/script/states/GameOver.js');
        game.load.script('gameOver', '/static/script/states/Game.js');
        game.load.script('credits', '/static/script/states/Credits.js');


    },

    loadBgm: function () {
        game.load.audio('dangerous', '/static/assets/bgm/Dangerous.mp3');
        game.load.audio('exit', '/static/assets/bgm/Exit the Premises.mp3');
        game.load.audio('click', '/static/assets/bgm/click.mp3');
    },

    loadImages: function () {
        game.load.image('menu-bg', '/static/assets/images/menu-bg.jpg');
        game.load.image('options-bg', '/static/assets/images/options-bg.jpg');
        game.load.image('gameover-bg', '/static/assets/images/gameover-bg.jpg');
        game.load.image('particle', '/static/assets/images/blue.png');
    },

    loadFonts: function () {
        WebFontConfig = {
            custom: {
                families: ['TheMinion'],
                urls: ['/static/style/theminion.css']
            }
        }
    },

    init: function () {
        this.loadingBar = game.make.sprite(game.world.centerX - (387 / 2), 400, "loading");
        this.status = game.make.text(game.world.centerX, 380, 'Loading...', {fill: 'white'});
        utils.centerGameObjects([this.status]);
    },

    addGameStates: function () {
        game.state.add("GameMenu", GameMenu);
        game.state.add("Game", Game);
        game.state.add("GameOver", GameOver);
        game.state.add("Credits", Credits);
        game.state.add("Options", Options);
    },

    addGameMusic: function () {
        musicPlayer = game.add.audio('dangerous');
        musicPlayer.loop = true;
        musicPlayer.play();
    },

    // The preload function then will call all of the previously defined functions:
    preload: function () {
        game.add.existing(this.loadingBar);
        game.add.existing(this.status);
        this.load.setPreloadSprite(this.loadingBar);

        this.loadScripts();
        this.loadImages();
        this.loadFonts();
        this.loadBgm();
    },


    create: function () {
        this.status.setText('Ready!');
        this.addGameStates();
        this.addGameMusic();
        setTimeout(function () {
            // We will load the main menu here
            game.state.start('GameMenu')
        }, 500);
    }
};

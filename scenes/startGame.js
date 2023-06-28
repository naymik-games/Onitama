class startGame extends Phaser.Scene {
  constructor() {
    super("startGame");
  }
  preload() {
    //this.load.bitmapFont('atari', 'assets/fonts/atari-smooth.png', 'assets/fonts/atari-smooth.xml');
    // this.load.bitmapFont('atari', 'assets/fonts/Lato_0.png', 'assets/fonts/lato.xml');

  }
  create() {

    gameData = JSON.parse(localStorage.getItem('onitamaSave'));
    if (gameData === null || gameData.length <= 0) {
      localStorage.setItem('onitamaSave', JSON.stringify(defaultValues));
      gameData = defaultValues;
    }

    this.cameras.main.setBackgroundColor(0x3E3546);

    var back = this.add.nineslice(game.config.width / 2, game.config.height / 2, 'board', null, 900, 1640, 14, 14, 14, 32).setOrigin(.5);


    //var title = this.add.bitmapText(game.config.width / 2, 100, 'topaz', 'Onitama', 160).setOrigin(.5).setTint(0xc76210);
    var title = this.add.text(game.config.width / 2, 100, 'Onitama', { fontFamily: 'Gamer', fontSize: '192px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    var cardLabel = this.add.text(game.config.width / 2, 300, 'SELECT CARD SET', { fontFamily: 'Gamer', fontSize: '100px', color: '#83ADB4', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    cardKey = 'cards'
    var cardText = this.add.text(game.config.width / 2, 375, 'CARD SET 1', { fontFamily: 'Gamer', fontSize: '160px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    cardText.setInteractive();
    cardText.on('pointerdown', function () {
      if (cardKey == 'cards') {
        cardKey = 'cards2'
        cardText.setText('CARD SET 2')
      } else {
        cardKey = 'cards'
        cardText.setText('CARD SET 1')
      }

    }, this);

    var aiLabel = this.add.text(game.config.width / 2, 600, 'SELECT OPPONENT', { fontFamily: 'Gamer', fontSize: '100px', color: '#83ADB4', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    gameMode = 'AI'
    var opponentText = this.add.text(game.config.width / 2, 675, 'AI', { fontFamily: 'Gamer', fontSize: '160px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    opponentText.setInteractive();
    opponentText.on('pointerdown', function () {
      if (gameMode == 'AI') {
        gameMode = 'PASS'
        opponentText.setText('HUMAN')
      } else {
        gameMode = 'AI'
        opponentText.setText('AI')
      }
    }, this);
    var startTime1 = this.add.text(game.config.width / 2, 1175, 'PLAY', { fontFamily: 'Gamer', fontSize: '160px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    //var startTime1 = this.add.bitmapText(game.config.width / 2, 575, 'topaz', 'PLAY HUMAN', 50).setOrigin(0, .5).setTint(0x000000);
    startTime1.setInteractive();
    startTime1.on('pointerdown', this.clickHandler, this);
    var per = gameData.wins / gameData.gamesPlayed * 100

    if (gameData.gamesPlayed == 0) {
      var text = gameData.wins + '/' + gameData.gamesPlayed + ' (0%)'
    } else {
      var text = gameData.wins + '/' + gameData.gamesPlayed + ' (' + Math.round(per) + '%)'
    }

    var aiLabel = this.add.text(game.config.width / 2, 1100, 'WINS: ' + text, { fontFamily: 'Gamer', fontSize: '100px', color: '#83ADB4', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    this.clearDataText = this.add.text(game.config.width / 2, 1550, 'RESET DATA', { fontFamily: 'Gamer', fontSize: '64px', color: '#fa0000', align: 'center' }).setOrigin(.5).setInteractive()
    this.clearDataText.on('pointerdown', function () {

      this.clearDataText.setText('DATA CLEARED')
      aiLabel.setText('WINS: 0/0 (0%)')
      localStorage.removeItem('onitamaSave');

      localStorage.setItem('onitamaSave', JSON.stringify(defaultValues));
      gameData = defaultValues;


    }, this)




  }
  clickHandler() {

    setCards()

    this.scene.start('playGame');

  }
  clickHandler2() {
    gameMode = 'PASS'
    this.scene.start('playGame');

  }

}
let game;
let sprite
let targets
let pieceSprites
let cardKey

window.onload = function () {
  let gameConfig = {
    type: Phaser.AUTO,
    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
      parent: "thegame",
      width: 900,
      height: 1640
    },
    pixelArt: true,
    scene: [preloadGame, startGame, playGame]
  }
  game = new Phaser.Game(gameConfig);
  window.focus();
}
/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////////////////////////////////////////////////

/////////////////////////////////////////////
class playGame extends Phaser.Scene {
  constructor() {
    super("playGame");
  }
  preload() {

  }
  create() {

    // this.structureText = this.add.text(25, game.config.height - 112, '', { fontFamily: 'Gamer', fontSize: '90px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    map = []
    boardSprite = []
    pieceSprites = []
    this.cameras.main.setBackgroundColor(0x3E3546);

    var home = this.add.sprite(50, 50, 'tiles', 13).setScale(4).setInteractive().setOrigin(0)
    home.on('pointerdown', function () {
      this.scene.stop()
      this.scene.start('startGame')
    }, this)


    gameOptions.tileSize = 20 * gameOptions.scale
    gameOptions.offsetX = (game.config.width - gameOptions.columns * gameOptions.tileSize) / 2
    gameOptions.offsetY = (game.config.height / 2 + 100) - (gameOptions.rows * gameOptions.tileSize) / 2

    this.unitBack = this.add.nineslice(game.config.width / 2, game.config.height / 2 + 108, 'board', null, 832, 850, 14, 14, 14, 32).setOrigin(.5);

    for (let i = 0; i < gameOptions.rows; i++) {
      map[i] = []
      boardSprite[i] = []
      pieceSprites[i] = []
      for (let j = 0; j < gameOptions.columns; j++) {
        let posX = gameOptions.offsetX + gameOptions.tileSize * j + gameOptions.tileSize / 2;
        let posY = gameOptions.offsetY + gameOptions.tileSize * i + gameOptions.tileSize / 2
        var back = this.add.sprite(posX, posY, 'tiles', 5).setDepth(0).setScale(gameOptions.scale)
        map[i][j] = 0
        boardSprite[i][j] = back
        pieceSprites[i][j] = null
      }
    }
    var pos = getPosition(0, 2)
    var blueSlot = this.add.sprite(pos.x, pos.y, 'tiles', 12).setDepth(0).setScale(gameOptions.scale)
    var pos = getPosition(4, 2)
    var redSlot = this.add.sprite(pos.x, pos.y, 'tiles', 12).setDepth(0).setScale(gameOptions.scale)

    this.setPiece(0, 0, B_P)
    this.setPiece(0, 1, B_P)
    this.setPiece(0, 2, B_K)
    this.setPiece(0, 3, B_P)
    this.setPiece(0, 4, B_P)
    this.setPiece(4, 0, R_P)
    this.setPiece(4, 1, R_P)
    this.setPiece(4, 2, R_K)
    this.setPiece(4, 3, R_P)
    this.setPiece(4, 4, R_P)
    //console.log(map)
    var gameCards = []
    // console.log(CARDS)
    var card_indexes_copy = JSON.parse(JSON.stringify(CARD_INDEXES))

    //console.log(card_indexes_copy)
    const randomItem = (arr) => arr.splice((Math.random() * arr.length) | 0, 1);

    //console.log(item)
    this.finsihed = false
    this.aiPlayer = BLUE
    this.playerTurn = RED
    this.selectedCard = null
    this.selectedPiece = null
    this.currentTargets = []
    for (var i = 0; i < 5; i++) {
      var item = randomItem(card_indexes_copy)[0]
      gameCards.push(item)
    }

    // console.log(gameCards)

    var redCard1 = this.add.sprite(game.config.width / 2 - 225, 1450, cardKey, gameCards[0]).setDepth(0).setScale(4).setInteractive()
    //  redCard1.flipX = true;
    //redCard1.flipY = true;
    var redCard1Text = this.add.text(game.config.width / 2 - 225, 1575, CARD_INDEX_NAMES[gameCards[0]], { fontFamily: 'Gamer', fontSize: '96px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    redCard1.on('pointerdown', function () {
      if (this.playerTurn != RED) { return }
      this.clearTargets()
      this.selectedCard = 0
      //console.log(this.selectedCard)
      this.selectedPiece = null
      this.cursor.setPosition(this.cardSlots[0].image.x, this.cardSlots[0].image.y)
    }, this)

    var redCard2 = this.add.sprite(game.config.width / 2 + 225, 1450, cardKey, gameCards[1]).setDepth(0).setScale(4).setInteractive()
    //redCard2.flipX = true;
    //redCard2.flipY = true;
    var redCard2Text = this.add.text(game.config.width / 2 + 225, 1575, CARD_INDEX_NAMES[gameCards[1]], { fontFamily: 'Gamer', fontSize: '96px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    redCard2.on('pointerdown', function () {
      if (this.playerTurn != RED) { return }
      this.clearTargets()
      this.selectedCard = 1
      //console.log(this.selectedCard)
      this.selectedPiece = null
      this.cursor.setPosition(this.cardSlots[1].image.x, this.cardSlots[0].image.y)
    }, this)

    var blueCard1 = this.add.sprite(game.config.width / 2 - 225, 400, cardKey, gameCards[2]).setDepth(0).setScale(4).setInteractive()
    var blueCard1Text = this.add.text(game.config.width / 2 - 225, 275, CARD_INDEX_NAMES[gameCards[2]], { fontFamily: 'Gamer', fontSize: '96px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    blueCard1.on('pointerdown', function () {
      if (this.playerTurn != BLUE) { return }
      this.clearTargets()
      this.selectedCard = 2
      //console.log(this.selectedCard)
      this.selectedPiece = null
      this.cursor.setPosition(this.cardSlots[2].image.x, this.cardSlots[2].image.y)
    }, this)

    var blueCard2 = this.add.sprite(game.config.width / 2 + 225, 400, cardKey, gameCards[3]).setDepth(0).setScale(4).setInteractive()
    var blueCard2Text = this.add.text(game.config.width / 2 + 225, 275, CARD_INDEX_NAMES[gameCards[3]], { fontFamily: 'Gamer', fontSize: '96px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,

    blueCard2.on('pointerdown', function () {
      if (this.playerTurn != BLUE) { return }
      this.clearTargets()
      this.selectedCard = 3
      //console.log(this.selectedCard)
      this.selectedPiece = null
      this.cursor.setPosition(this.cardSlots[3].image.x, this.cardSlots[2].image.y)
    }, this)

    var middleCard = this.add.sprite(game.config.width / 2 - 25, 100, cardKey, gameCards[4]).setDepth(0).setOrigin(1, .5).setScale(3).setTint(0xCCCCCC)
    var middleCardText = this.add.text(game.config.width / 2 + 25, 100, CARD_INDEX_NAMES[gameCards[4]], { fontFamily: 'Gamer', fontSize: '96px', color: '#fafafa', align: 'left' }).setOrigin(0, .5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,


    this.cardSlots = [
      {
        cardIndex: gameCards[0],
        image: redCard1,
        text: redCard1Text
      },
      {
        cardIndex: gameCards[1],
        image: redCard2,
        text: redCard2Text
      },
      {
        cardIndex: gameCards[2],
        image: blueCard1,
        text: blueCard1Text
      },
      {
        cardIndex: gameCards[3],
        image: blueCard2,
        text: blueCard2Text
      },
      {
        cardIndex: gameCards[4],
        image: middleCard,
        text: middleCardText
      }
    ]

    this.redMarker = this.add.sprite(game.config.width / 2, 1400, 'tiles', 11).setDepth(0).setScale(6).setInteractive().setAlpha(0)
    this.redMarker.on('pointerdown', function () {
      this.nextTurn()
    }, this)
    this.blueMarker = this.add.sprite(game.config.width / 2, 450, 'tiles', 10).setDepth(0).setScale(6).setInteractive().setAlpha(0)
    this.blueMarker.on('pointerdown', function () {
      this.nextTurn()
    }, this)
    if (this.playerTurn == RED) {
      this.redMarker.setAlpha(1)
    } else {
      this.blueMarker.setAlpha(1)
    }


    this.cursor = this.add.image(-100, -100, 'cursor').setDepth(1).setScale(4)
    this.cursorPiece = this.add.image(-100, -100, 'tiles', 7).setDepth(1).setScale(gameOptions.scale)


    targets = this.add.group({
      defaultKey: 'tiles',
      defaultFrame: 9,
      maxSize: -1
    });

    this.input.on("pointerdown", this.clickStart, this);
    //  this.input.on("pointermove", this.clickMove, this);
    // this.input.on("pointerup", this.clickEnd, this);
    //this.check = this.add.image(725, 1000, 'check').setScale(.7);
    //  this.aiMove()
  }
  update() {

  }
  setPiece(row, column, piece) {
    var pos = getPosition(row, column)
    var back = this.add.sprite(pos.x, pos.y, 'tiles', piece).setDepth(1).setScale(gameOptions.scale)
    map[row][column] = piece
    pieceSprites[row][column] = back
  }
  clickStart(pointer) {
    let row = Math.floor((pointer.worldY - gameOptions.offsetY) / gameOptions.tileSize);
    let col = Math.floor((pointer.worldX - gameOptions.offsetX) / gameOptions.tileSize);

    if (validPick(row, col)) {
      this.clearTargets()
      //console.log(row + ', ' + col)
      if (this.selectedPiece == null) {
        if (map[row][col] > 0 && COLORS[map[row][col]] == this.playerTurn && this.selectedCard != null) {
          // console.log(map[row][col])
          // console.log(COLORS[map[row][col]])
          var pos = getPosition(row, col)
          this.cursorPiece.setPosition(pos.x, pos.y)
          this.selectedPiece = { row: row, column: col }
          this.addMarkers(row, col)
        }

      } else {
        if (this.validMove(row, col)) {
          //console.log('move to ' + row + ', ' + col)
          this.movePiece(row, col)
        }
        //console.log(this.selectedPiece)
      }
    }
  }

  movePiece(row, col) {
    if (map[row][col] > 0) {
      // console.log('occupied by ' + map[row][col])
      var tween = this.tweens.add({
        targets: pieceSprites[row][col],
        alpha: 0,
        y: '-=150',
        duration: 500,
        onComplete: () => {
          pieceSprites[row][col].destroy()
        }
      })
    }
    var pos = getPosition(row, col)
    var tween = this.tweens.add({
      targets: pieceSprites[this.selectedPiece.row][this.selectedPiece.column],
      x: pos.x,
      y: pos.y,
      duration: 500,
      onComplete: () => {
        if (map[row][col] == 2 || map[row][col] == 4) {
          //alert('game over ' + PLAYERS[this.playerTurn] + ' wins')
          this.finsihed = true
          this.gameOver(this.playerTurn)
        } else if (this.playerTurn == RED && row == 0 && col == 2 && map[this.selectedPiece.row][this.selectedPiece.column] == 4) {
          //  alert('game over red wins')
          this.finsihed = true
          this.gameOver(RED)
        } else if (this.playerTurn == BLUE && row == 4 && col == 2 && map[this.selectedPiece.row][this.selectedPiece.column] == 2) {
          //alert('game over blue wins')
          this.finsihed = true
          this.gameOver(BLUE)
        }
        this.completeMove(row, col)
      }
    })
  }

  completeMove(torow, tocolumn) {
    /* console.log(map[torow][tocolumn])
    if (map[torow][tocolumn] > 0) {
      console.log('occupied by ' + map[row][col])
    } */

    //swap pieces
    var tempS = pieceSprites[this.selectedPiece.row][this.selectedPiece.column]
    var tempP = map[this.selectedPiece.row][this.selectedPiece.column]
    pieceSprites[this.selectedPiece.row][this.selectedPiece.column] = null
    map[this.selectedPiece.row][this.selectedPiece.column] = 0
    pieceSprites[torow][tocolumn] = tempS
    map[torow][tocolumn] = tempP
    //swap cards
    /* {
      cardIndex: gameCards[0],
      image: redCard1,
      text: redCard1Text
    }, */
    var currCard = this.cardSlots[this.selectedCard].cardIndex
    var midCard = this.cardSlots[4].cardIndex
    this.cardSlots[this.selectedCard].image.setFrame(midCard)
    this.cardSlots[this.selectedCard].text.setText(CARD_INDEX_NAMES[midCard])
    this.cardSlots[4].image.setFrame(currCard)
    this.cardSlots[4].text.setText(CARD_INDEX_NAMES[currCard])
    this.cardSlots[this.selectedCard].cardIndex = midCard
    this.cardSlots[4].cardIndex = currCard
    //clear and switch players

    this.nextTurn()
  }
  nextTurn() {
    this.selectedCard = null
    this.selectedPiece = null
    this.clearTargets()
    this.currentTargets = []
    this.cursorPiece.setPosition(-100, -100)
    this.cursor.setPosition(-100, -100)
    if (this.playerTurn == RED) {
      this.playerTurn = BLUE
      this.redMarker.setAlpha(0)
      this.blueMarker.setAlpha(1)
      if (gameMode == 'AI' && !this.finsihed) {
        this.aiMove()
      }

    } else {
      this.playerTurn = RED
      this.redMarker.setAlpha(1)
      this.blueMarker.setAlpha(0)
    }
  }
  addMarkers(row, column) {
    this.currentTargets = []
    var cardIndex = this.cardSlots[this.selectedCard].cardIndex
    // console.log(CARDS[this.selectedCard])
    for (let i = 0; i < CARDS[cardIndex].length; i++) {
      const move = CARDS[cardIndex][i];
      if (validPick(row + move.y, column + move.x)) {
        if (map[row + move.y][column + move.x] == 0 || COLORS[map[row + move.y][column + move.x]] != this.playerTurn) {//map[row + move.y][column + move.x] == 1 || map[row + move.y][column + move.x] == 2) && 
          // var target = targets.get().setActive(true).setVisible(true);
          // target.setFrame(9)
          // target.setOrigin(0.5, 0.5).setScale(6).setDepth(1000).setAlpha(.6);
          this.currentTargets.push({ row: row + move.y, column: column + move.x })
          boardSprite[row + move.y][column + move.x].setFrame(8)
          //var pos = getPosition(row + move.y, column + move.x)
          //target.setPosition(pos.x, pos.y)
        }
      }
    }
    //console.log(this.currentTargets)
    /*   var target = targets.get().setActive(true).setVisible(true);
      target.setFrame(frame)
      target.setOrigin(0.5, 0.5).setScale(6).setDepth(1000).setAlpha(.6);
      var pos = getPosition(tile.row, tile.column)
      target.setPosition(pos.x, pos.y) */
  }

  aiMove() {
    var pieces = this.getPieces(this.aiPlayer)
    this.possibleMoves = []
    for (let i = 0; i < pieces.length; i++) {
      const element = pieces[i];
      this.aiGetCardMoves(element.row, element.column, this.cardSlots[2].cardIndex, 2)
      this.aiGetCardMoves(element.row, element.column, this.cardSlots[3].cardIndex, 3)
    }
    // console.log(this.possibleMoves)
    if (this.possibleMoves.length > 0) {

      var moveIndex = this.aiSelectMove()
      // console.log(moveIndex)
      var selectedMove = this.possibleMoves[moveIndex]
      //console.log(selectedMove)

      this.selectedPiece = { row: selectedMove.pieceRow, column: selectedMove.pieceColumn }
      this.selectedCard = selectedMove.slot


      this.movePiece(selectedMove.row, selectedMove.column)
    } else {
      this.nextTurn()
    }
  }
  aiGetCardMoves(row, column, card, slot) {
    //console.log(CARD_INDEX_NAMES[card])
    //loop through all valid move locations for a card and assign score 0 for empty, 1 for pawn, 4 for king
    var moves = []
    for (let i = 0; i < CARDS[card].length; i++) {
      const move = CARDS[card][i];
      if (validPick(row + move.y, column + move.x)) {
        if (map[row + move.y][column + move.x] == 0 || COLORS[map[row + move.y][column + move.x]] != this.aiPlayer) {//map[row + move.y][column + move.x] == 1 || map[row + move.y][column + move.x] == 2) &&
          // var target = targets.get().setActive(true).setVisible(true);
          // target.setFrame(9)
          var score = 0
          if (map[row + move.y][column + move.x] == 0) {
            score = 0
          } else if (map[row + move.y][column + move.x] == 3) {
            score = 1
          } else if (map[row + move.y][column + move.x] == 4) {
            score = 4
          }
          // target.setOrigin(0.5, 0.5).setScale(6).setDepth(1000).setAlpha(.6);
          this.possibleMoves.push({ row: row + move.y, column: column + move.x, score: score, pieceRow: row, pieceColumn: column, slot: slot })
          //boardSprite[row + move.y][column + move.x].setFrame(8)
          //var pos = getPosition(row + move.y, column + move.x)
          //target.setPosition(pos.x, pos.y)
        }
      }
    }
    if (moves.length > 0) {
      //console.log(moves)
      //return moves
    }

    //return moves
  }
  aiSelectMove() {
    var score0 = []
    var score1 = []
    var score2 = []
    var score3 = []
    var score4 = []
    //sort moves by score
    for (let i = 0; i < this.possibleMoves.length; i++) {
      const element = this.possibleMoves[i];
      if (element.score == 0) {
        score0.push(i)
      } else if (element.score == 1) {
        score1.push(i)
      } else if (element.score == 2) {
        score2.push(i)
      } else if (element.score == 3) {
        score3.push(i)
      } else if (element.score == 4) {
        score4.push(i)
      }
    }
    //select first move for highest available score
    if (score4.length > 0) {
      return score4[0]
    } else if (score3.length > 0) {
      return score3[0]
    } else if (score2.length > 0) {
      return score2[0]
    } else if (score1.length > 0) {
      return score1[0]
    } else if (score0.length > 0) {
      return score0[0]
    }
  }
  getPieces(color) {
    var temp = []
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (COLORS[map[i][j]] == color) {
          temp.push({ row: i, column: j })
        }
      }
    }
    return temp
  }

  validMove(row, column) {
    for (let i = 0; i < this.currentTargets.length; i++) {
      const element = this.currentTargets[i];
      if (row == element.row && column == element.column) {
        return true
      }
    }
    return false
  }
  clearTargets() {
    if (this.currentTargets.length > 0) {
      for (let i = 0; i < this.currentTargets.length; i++) {
        const element = this.currentTargets[i];
        boardSprite[element.row][element.column].setFrame(5)
      }
    }

    /*   targets.getChildren().forEach(function (sprite) {
        targets.killAndHide(sprite);
      }, this); */
  }
  gameOver(player) {
    gameData.gamesPlayed++
    if (player == RED) {
      gameData.wins++
    }
    localStorage.setItem('onitamaSave', JSON.stringify(gameData));
    var modalContainer = this.add.container().setDepth(10).setPosition(game.config.width / 2, game.config.height / 2)
    var modalBack = this.add.nineslice(0, 0, 'modal', null, 600, 400, 8, 8, 8, 8).setOrigin(.5);
    modalContainer.add(modalBack)
    var text = PLAYERS[player] + ' WINS!'
    var overText = this.add.text(0, -100, text, { fontFamily: 'Gamer', fontSize: '96px', color: '#fafafa', align: 'left' }).setOrigin(.5)//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    modalContainer.add(overText)
    var homeText = this.add.text(0, +100, 'HOME', { fontFamily: 'Gamer', fontSize: '96px', color: '#fafafa', align: 'left' }).setOrigin(.5).setInteractive()//C6EFD8  backgroundColor: '#000000', padding: { left: 7, right: 7, top: 0, bottom: 15 }, fixedWidth: 350,
    modalContainer.add(homeText)
    homeText.on('pointerdown', function () {
      this.scene.stop()
      this.scene.start('startGame')
    }, this)
    var model = this.plugins.get('rexmodalplugin').add(modalContainer, {
      duration: {
        in: 1000,
        out: 1000
      },

      // destroy: false
    })
  }
  addScore() {
    this.events.emit('score');
  }
}

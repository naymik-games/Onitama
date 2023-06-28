function loadFont(name, url) {
  var newFont = new FontFace(name, `url(${url})`);
  newFont.load().then(function (loaded) {
    document.fonts.add(loaded);
  }).catch(function (error) {
    return error;
  });
}
loadFont("KenneyPixelSquare", "assets/fonts/KenneyPixelSquare.ttf");
loadFont("KenneyMiniSquare", "assets/fonts/KenneyMiniSquare.ttf");
loadFont("Gamer", "assets/fonts/Gamer.ttf");


let gameOptions = {
  tileSize: 96,
  scale: 8,

  offsetX: 50,
  offsetY: 125,
  rows: 5,//6 max
  columns: 5, //7 max
  scale32: 3,
  numberOfPlayers: 2



}

let map
let boardSprite
let gameData;
var defaultValues = {
  wins: 0,
  gamesPlayed: 0
}
let gameMode = 'PASS'
//returns true if coordinates are valid
function validPick(row, column) {
  return row >= 0 && row < gameOptions.rows && column >= 0 && column < gameOptions.columns && map[row] != undefined && map[row][column] != undefined;
}
//returns screen x,y of grid coordinates
function getPosition(row, column) {
  return { x: boardSprite[row][column].x, y: boardSprite[row][column].y }
}
function pos(a, b) {
  return {
    x: a,
    y: b
  }
}
var E = 0
  , RED = 0
  , BLUE = 1
  , B_P = 1
  , B_K = 2
  , R_P = 3
  , R_K = 4
  , BOARD_SIZE = 5
  , COLOR = {};
var PLAYERS = ['RED', 'BLUE']
var COLORS = {}
COLORS[1] = 1
COLORS[2] = 1
COLORS[3] = 0
COLORS[4] = 0
COLOR[B_P] = BLUE,
  COLOR[B_K] = BLUE,
  COLOR[R_P] = RED,
  COLOR[R_K] = RED;

var CARD_INDEX_NAMES
var Tiger, Lion
var Dragon, Dog
var Frog, Turtle
var Rabbit, Fox
var Crab, Rat
var Elephant, Panda
var Goose, Lizard
var Rooster, Wasp
var Monkey, Scorpian
var Mantis, Bear
var Horse, Heron
var Ox, Asp
var Crane, Fish
var Boar, Viper
var Eel, Giraffe
var Cobra, Otter
var CARDS

function setCards() {
  if (cardKey == 'cards') {
    Tiger = [pos(0, 1), pos(0, -2)]
    Dragon = [pos(-2, -1), pos(2, -1), pos(-1, 1), pos(1, 1)]
    Frog = [pos(-2, 0), pos(-1, -1), pos(1, 1)]
    Rabbit = [pos(2, 0), pos(1, -1), pos(-1, 1)]
    Crab = [pos(-2, 0), pos(0, -1), pos(2, 0)]
    Elephant = [pos(-1, -1), pos(-1, 0), pos(1, -1), pos(1, 0)]
    Goose = [pos(-1, -1), pos(-1, 0), pos(1, 0), pos(1, 1)]
    Rooster = [pos(-1, 1), pos(-1, 0), pos(1, 0), pos(1, -1)]
    Monkey = [pos(-1, -1), pos(-1, 1), pos(1, -1), pos(1, 1)]
    Mantis = [pos(0, 1), pos(-1, -1), pos(1, -1)]
    Horse = [pos(-1, 0), pos(0, 1), pos(0, -1)]
    Ox = [pos(1, 0), pos(0, 1), pos(0, -1)]
    Crane = [pos(-1, 1), pos(0, -1), pos(1, 1)]
    Boar = [pos(-1, 0), pos(0, -1), pos(1, 0)]
    Eel = [pos(-1, -1), pos(-1, 1), pos(1, 0)]
    Cobra = [pos(-1, 0), pos(1, 1), pos(1, -1)]
    CARDS = [Tiger, Dragon, Frog, Rabbit, Crab, Elephant, Goose, Rooster, Monkey, Mantis, Horse, Ox, Crane, Boar, Eel, Cobra]
    CARD_INDEX_NAMES = ["Tiger", "Dragon", "Frog", "Rabbit", "Crab", "Elephant", "Goose", "Rooster", "Monkey", "Mantis", "Horse", "Ox", "Crane", "Boar", "Eel", "Cobra"];

  } else {
    Lion = [pos(-2, -1), pos(-2, 1), pos(2, -1), pos(2, 1)]
    Dog = [pos(-1, -2), pos(1, 2)]
    Turtle = [pos(0, -1), pos(1, 0), pos(0, 1), pos(-1, 0)]
    Fox = [pos(-1, -1), pos(1, 1)]

    Rat = [pos(-2, -1), pos(0, -1), pos(2, 1), pos(0, 1),]
    Panda = [pos(-1, -2), pos(1, -1), pos(0, 2)]
    Lizard = [pos(0, -2), pos(-1, 1), pos(1, 2)]
    Wasp = [pos(-1, 0), pos(-1, 0), pos(1, 0), pos(2, -1)]

    Scorpian = [pos(-1, 0), pos(1, -1), pos(2, 0), pos(1, 1)]
    Bear = [pos(-2, 0), pos(-1, -1), pos(-1, 1), pos(1, 0)]
    Heron = [pos(-2, 0), pos(0, -1), pos(0, -2), pos(2, 0)]
    Asp = [pos(-1, -1), pos(1, -1), pos(-1, 2), pos(1, 2)]

    Fish = [pos(2, -2), pos(-2, -1), pos(-2, -2), pos(2, 1)]
    Viper = [pos(-1, -1), pos(0, 1), pos(2, 2)]
    Giraffe = [pos(-2, -2), pos(0, -1), pos(1, 1)]
    Otter = [pos(-1, -1), pos(-2, 0), pos(1, -1), pos(2, 0), pos(0, 2)]
    CARDS = [Lion, Dog, Turtle, Fox, Rat, Panda, Lizard, Wasp, Scorpian, Bear, Heron, Asp, Fish, Viper, Giraffe, Otter]
    CARD_INDEX_NAMES = ["Lion", "Dog", "Turtle", "Fox", "Rat", "Panda", "Lizard", "Wasp", "Scorpian", "Bear", "Heron", "Asp", "Fish", "Viper", "Giraffe", "Otter"];

  }

}



var CARD_INDEXES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]



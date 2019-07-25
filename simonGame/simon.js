var game = {
  count: 0,
  possibilities: ['#green','#blue', '#red', '#dark'],
  currentGame: [],
  player: [],
  sound:{
    blue: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3'),
    red: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3'),
    dark: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3'),
    green: new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3')
  },
  strict: false,
}
function newGame() {
  clearGame();
}

function clearGame() {
  game.currentGame = [];
  game.count = 0;
  addCount();
}

function addCount() {
  game.count++;
  $('#clickNumber').addClass('animated fadeOutDown');

  setTimeout(function(){
    $('#clickNumber').removeClass('fadeOutDown').html(game.count).addClass('fadeInDown');
  }, 200);

  generateMove();
}
function generateMove(){
    game.currentGame.push(game.possibilities[(Math.floor(Math.random()*4))]);
  showMoves();
}
function showMoves() {
  var i = 0;
  var moves = setInterval(function(){
    playGame(game.currentGame[i]);
    i++;
    if (i >= game.currentGame.length) {
      clearInterval(moves);
    }
  }, 600)

  clearPlayer();
}

function playGame(field) {
  $(field).addClass('hover');
  sound(field);
  setTimeout(function(){
      $(field).removeClass('hover');
  }, 300);
}
function clearPlayer() {
  game.player = [];
}

function addToPlayer(id) {
  var field = "#"+id
  console.log(field);
  game.player.push(field);
  playerTurn(field);
}

function playerTurn(x) {
  if (game.player[game.player.length - 1] !== game.currentGame[game.player.length - 1]) {
    if(game.strict){
      alert('Try again! ...From scratch!');
      newGame();
    } else {
      alert('Wrong move! Try again!');
      showMoves();
    }
   } else {
      console.log('Good Move!');
      sound(x);
      var check = game.player.length === game.currentGame.length;
      if (check) {
        if(game.count == 20){
          alert('You won! Congrats.');
        } else {
          alert('Next round!');
          nextLevel();
        }
      }
    }
}

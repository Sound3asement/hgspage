/*
 * Simon Game Javascript
 * Logic Credit: https://medium.com/front-end-hacking/create-simon-game-in-javascript-d53b474a7416#.yg9ndrmre
 */

$ = jQuery;

$(document).ready(function() {
  //Object for the game
  var play = {
    count: 0,
    colors: ["#red", "#blue", "#green", "#yellow"],
    currentRound: [],
    player: [],
    audio: {
      red: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3"),
      blue: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3"),
      green: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3"),
      yellow: new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3")
    },
    strict: false
  };

  $("#start").on("click", function() {
    newRound();
  });

  $(".start-game").on("click", function() {
    aggregateId(this.id);
  });

  //function to check strict mode
  $(".strict").change(function() {
    if (this.checked) {
      play.strict = true;
      newRound();
    } else {
      play.strict = false;
      newRound();
    }
  });

  function newRound() {
    clearRound();
  }

  function clearRound() {
    play.currentRound = [];
    play.count = 0;
    incrCount();
  }
  //Initializing the round number
  function incrCount() {
    play.count++;
    $("#clickNumber").html(play.count);
    createSequence();
  }
  //Creating a random number to highlight the div
  function createSequence() {
    play.currentRound.push(play.colors[Math.floor(Math.random() * 4)]);
    showSequence();
  }
  //highlight sequence of divs
  function showSequence() {
    var i = 0;
    var moves = setInterval(function() {
      playRound(play.currentRound[i]);
      i++;
      if (i >= play.currentRound.length) {
        clearInterval(moves);
      }
    }, 600);
    clearPlayer();
  }
  //adding hover class to the divs to highlight them
  //using set interval function to achieve them in a loop
  function playRound(color) {
    $(color).addClass("hover");
    audio(color);
    setTimeout(function() {
      $(color).removeClass("hover");
    }, 300);
  }

  function clearPlayer() {
    play.player = [];
  }

  function audio(name) {
    switch (name) {
      case "#red":
        play.audio.red.play();
        break;
      case "#blue":
        play.audio.blue.play();
        break;
      case "#green":
        play.audio.green.play();
        break;
      case "#yellow":
        play.audio.yellow.play();
        break;
    }
  }
  //function to get the id of the div clicked
  function aggregateId(id) {
    var param = "#" + id;
    play.player.push(param);
    playerRound(param);
  }

  function playerRound(val) {
    //crosschecking whether the right color is selected
    //comparing from player and currentRound array
    if (
      play.player[play.player.length - 1] !==
      play.currentRound[play.player.length - 1]
    ) {
      if (play.strict) {
        $("h1").html("Try again! ...From scratch!"); //if strict mode switched on restarting
        newRound();
      } else {
        $("h1").html("Wrong move! Try again!");
        showSequence();
      }
    } else {
      audio(val);
      var check = play.player.length === play.currentRound.length;
      if (check) {
        if (play.count == 20) {
          $("h1").html("You won! Congrats.");
        } else {
          $("h1").html("Next round!");
          nextRound();
        }
      }
    }
  }
  //function to show the current round
  function nextRound() {
    incrCount();
  }
});

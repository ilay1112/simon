var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var index = 0;
var gameStarted = false;
var level = 0;
var userChosenColour;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber]
  gamePattern.push(randomChosenColour);
  animatePress(randomChosenColour);
  playSound(randomChosenColour);
  level++;
  $("h1").text("level " + level);
  console.log(gamePattern);
}

function playSound(colour) {
  var colourSound = new Audio("/sounds/" + colour + ".mp3");
  colourSound.play();
}

function animatePress(currentColour) {
  var currentButton = $("#" + currentColour);
  currentButton.addClass("pressed");
  setTimeout(function() {
    currentButton.removeClass("pressed");
  }, 100);
}

$(".btn").click(function(event) {
  userChosenColour = event.target.id;
  userClickedPattern.push(userChosenColour);
  checkAnswer(index)
});

function checkAnswer(currentLevel) {
  if (userClickedPattern[index] === gamePattern[index]) {
    correct();
    index++;
    if (index === gamePattern.length) {
      resetParameters();
      setTimeout(function() {
        nextSequence();
      }, 400);
    }
  } else {
    console.log("wrong");
    gameOver();
  }
}
function startGame() {
  if (gameStarted) {
    return;
  } else {
    $("h1").text("level " + level);
    gameStarted = true;
    nextSequence();
  }
}
function resetParameters() {
  userClickedPattern.length = 0;
  index = 0;
}
function resetAllParameters() {
  $("h1").text("Press A Key to Start");
  userClickedPattern.length = 0;
  index = 0;
  gamePattern.length = 0;
  gameStarted = false;
  level = 0;
}

function gameOver() {
  $("h1").text("Press A Key To Start Over");
  playSound("wrong");
  resetParameters();
  gamePattern.length = 0;
  gameStarted = false;
  level = 0;
}

function correct() {
  playSound(userChosenColour);
  animatePress(userChosenColour);
}

$(document).keypress(function(event) {
  startGame()
});

$("#start").click(function(){
  startGame()
});

$("#reset").click(function(){
  resetAllParameters()
});

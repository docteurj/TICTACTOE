let startButton = document.getElementById("startButton");
let restartButton = document.getElementById("restartButton");

var player1Name = "";
var player2Name = "";
var currentPlayer = "";

var playerOneMoves = [];
var playerTwoMoves = [];
var winningCombination = [];
var moveCount = 0;
var possibleWinningCombinations = {
  horizontallyRow1: ["squareOne", "squareTwo", "squareThree"],
  horizontallyRow2: ["squareFour", "squareFive", "squareSix"],
  horizontallyRow3: ["squareSeven", "squareEight", "squareNine"],
  verticallyCol1: ["squareOne", "squareFour", "squareSeven"],
  verticallyCol2: ["squareTwo", "squareFive", "squareeight"],
  verticallyCol3: ["squareThree", "squareSix", "squareNine"],
  positiveDiagonal: ["squareSeven", "squareFive", "squareThree"],
  negativeDiagonal: ["squareOne", "squareFive", "squareNine"],
}

function onStart() {
  // clear previous games data
  clearAllData();

  // collect player names
  let playerOneElement = document.getElementById("player1Name");
  let playerTwoElement = document.getElementById("player2Name");

  player1Name = playerOneElement.value;
  player2Name = playerTwoElement.value;
  playerOneElement.value = "";
  playerTwoElement.value = "";

  // if player names not given, assign default values
  if (player1Name === "") {
    player1Name = "Player 1";
  }
  if (player2Name === "") {
    player2Name = "Player 2";
  }

  // game always start with player one as current player
  currentPlayer = player1Name;

  // hide the player name input boxes
  let playerInput = document.getElementById("playerInput");
  playerInput.hidden = true;

  // make tic tac toe grid clickable
  let ticTacToeGridBoxes = document.querySelectorAll(".square");
  ticTacToeGridBoxes.forEach(square => {
    square.addEventListener("click", onBoxClick);
  });

  // make restart button clickable
  restartButton.disabled = false;
  // make start button unclickable
  startButton.disabled = true;
}

function onRestart() {
  // make the player name input boxes visible
  let playerInput = document.getElementById("playerInput");
  playerInput.hidden = false;

  // clear everything
  clearAllData();

  // make start button clickable
  startButton.disabled = false;
  // make restart button unclickable
  restartButton.disabled = true;
}

function onBoxClick(event) {
  let square = event.target;
  moveCount++;
  // remove event listener from the box so its not selectable again
  square.removeEventListener("click", onBoxClick);

  // Take actions based on current player
  if (currentPlayer === player1Name) {
    // visualize players selection
    square.getElementsByClassName("crossImg")[0].hidden = false;
    // record players move
    playerOneMoves.push(square.id);
    // check if player wins after this click, visualize and end game if player wins
    if (isWinningBoard(playerOneMoves)) {
      visualizeWinningBoard(player1Name, winningCombination);
      disableGridBoxes();
    }
    else if (moveCount == 9) {
      matchDraw();
      disableGridBoxes();
    }
    else {
      // change player for the next move if game is still on
      currentPlayer = player2Name;
    }
  }
  else {
    // visualize players selection
    square.getElementsByClassName("circleImg")[0].hidden = false;
    // record players move
    playerTwoMoves.push(square.id);
    // check if player wins after this click, visualize and end game if player wins
    if (isWinningBoard(playerTwoMoves)) {
      visualizeWinningBoard(player2Name, winningCombination);
      disableGridBoxes();
    }
    else if (moveCount == 9) {
      matchDraw();
      disableGridBoxes();
    }
    else {
      // change player for the next move if game is still on
      currentPlayer = player2Name;
    }
    // change player for the next move if game is still on
    currentPlayer = player1Name;
  }
}

function isWinningBoard(playerMoves) {
  let index = 0;
  for (const possibleWinningCombination of Object.values(possibleWinningCombinations)) {
    let isWinning = true;
    for (const winningMove of possibleWinningCombination) {
      if (!playerMoves.includes(winningMove)) {
        isWinning = false;
      }
    }
    if (isWinning) {
      winningCombination = possibleWinningCombinations[index];
      return true;
    }
    index++;
  }
  return false;
}

function matchDraw() {
  // visualize results
  document.getElementById("champion").innerHTML = "Draw!";
  // disable restart button
  restartButton.disabled = true;
  // enable start button
  startButton.disabled = false;
  // make the player name input boxes visible
  let playerInput = document.getElementById("playerInput");
  playerInput.hidden = false;
}

function visualizeWinningBoard(playerName, winningCombination) {
  // visualize results
  document.getElementById("champion").innerHTML = playerName + " won!";
  // disable restart button
  restartButton.disabled = true;
  // enable start button
  startButton.disabled = false;
  // make the player name input boxes visible
  let playerInput = document.getElementById("playerInput");
  playerInput.hidden = false;
}

function clearAllData() {
  // reset move count
  moveCount = 0;
  // clear all player moves
  playerOneMoves = [];
  playerTwoMoves = [];
  // clear plaer names
  player1Name = "";
  player2Name = "";
  // clear current player name
  currentPlayer = "";
  // clear tic tac toe grid
  let ticTacToeGridBoxes = document.querySelectorAll(".square");
  ticTacToeGridBoxes.forEach(square => {
    square.getElementsByClassName("crossImg")[0].hidden = true;
    square.getElementsByClassName("circleImg")[0].hidden = true;
  });
  // clear previous results
  document.getElementById("champion").innerHTML = "";
}

function disableGridBoxes() {
  let ticTacToeGridBoxes = document.querySelectorAll(".square");
  ticTacToeGridBoxes.forEach(square => {
    square.removeEventListener("click", onBoxClick);
  });
}

startButton.addEventListener("click", onStart);
restartButton.addEventListener("click", onRestart);
restartButton.disabled = true;
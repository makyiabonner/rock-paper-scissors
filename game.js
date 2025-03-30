/*
This is a game of rock paper scissors
user is prompted to input rock paper or scissors
function is then generated for opponent to make a random 
   choice as well
Winner is then decided, also game and record is also displayed

User Pick
    Prompt user to pick

Validate User Pick
    Check if user pick is valid by checking array's options

CPU Pick
    CPU generates random number to pluck from array

GAME
    Runs and Store User Pick
    Validates User Pick or Restarts Game
    Runs and Store CPU Pick
    Have if statements to mandate game rules
        Update Game Info (Current Game, Record, Winner/Loser)
    Ask if User wishes to restart game
*/

let totalGames = Number(localStorage.getItem("total games")) || 0;
let userWins = Number(localStorage.getItem("wins")) || 0;
let userLosses = Number(localStorage.getItem("losses")) || 0;
let userDraws = Number(localStorage.getItem("draws")) || 0;
let allTimeRecord = localStorage.getItem("All-Time Record");
let userRecord = `Your All-Time Record is: ${userWins}-${userLosses}-${userDraws}`;

const GAME_CHOICES = ["rock", "paper", "scissors"];

function userPick() {
  return prompt("Pick a choice, rock, paper, or scissors").toLowerCase();
}

function validatePick(pick, userCallback, cpuCallback) {
  debugger;
  if (GAME_CHOICES[GAME_CHOICES.indexOf(pick)] === pick) {
    return pick;
  } else {
    alert("Your choice is invalid, try again");
    game(userCallback, cpuCallback);
  }
}

function cpuPick() {
  return GAME_CHOICES[Math.floor(Math.random() * GAME_CHOICES.length - 1)];
}

function setLocalStorage() {
  localStorage.setItem("total games", totalGames);
  localStorage.setItem("wins", userWins);
  localStorage.setItem("losses", userLosses);
  localStorage.setItem("draws", userDraws);
  localStorage.setItem("All-Time Record", userRecord);
}

function updateGameResults(str) {
  totalGames++;
  if (str === "win") {
    userWins++;
    alert(`GAME:${totalGames} YOU WIN, ${userRecord}`);
  } else if (str === "lose") {
    userLosses++;
    alert(`GAME:${totalGames} YOU LOSE, ${userRecord}`);
  } else if (str === "draw") {
    userDraws++;
    alert(`GAME:${totalGames} DRAW, ${userRecord}`);
  }
}

function restartGame(callback, userCallback, cpuCallback) {
  return confirm("Would you like to play again?")
    ? callback(userCallback, cpuCallback)
    : alert("Thanks for playing, refresh page if you change your mind.");
}
function game(userCallback, cpuCallback) {
  let user = userCallback();
  let cpu = cpuCallback();

  let result = null;
  validatePick(user, userCallback, cpuCallback);
  if (
    //Winner
    (user == "rock" && cpu == "scissors") ||
    (user == "paper" && cpu == "rock") ||
    (user == "scissors" && cpu == "paper")
  ) {
    result = "win";
  } else if (
    //Loser
    (cpu == "rock" && user == "scissors") ||
    (cpu == "paper" && user == "rock") ||
    (cpu == "scissors" && user == "paper")
  ) {
    result = "lose";
  } else if (user == cpu) {
    result = "draw";
  }

  updateGameResults(result);
  setLocalStorage();
  restartGame(game, userCallback, cpuCallback);
}
console.log(GAME_CHOICES.indexOf("rock"));
game(userPick, cpuPick);
console.log("pencil");

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
let stats = {
  totalGames: Number(localStorage.getItem("total games")) || 0,
  userWins: Number(localStorage.getItem("wins")) || 0,
  userLosses: Number(localStorage.getItem("losses")) || 0,
  userDraws: Number(localStorage.getItem("draws")) || 0,
  allTimeRecord: localStorage.getItem("All-Time Record"),
};

let userRecord = `Your All-Time Record is: ${stats.userWins}-${stats.userLosses}-${stats.userDraws}`;

const GAME_CHOICES = ["rock", "paper", "scissors"];

function userPick() {
  return prompt("Pick a choice, rock, paper, or scissors").toLowerCase();
}

function validatePick(pick, userCallback, cpuCallback) {
  if (GAME_CHOICES.includes(pick)) {
    return pick;
  } else {
    alert("Your choice is invalid, try again");
    game(userCallback, cpuCallback);
  }
}

function cpuPick() {
  return GAME_CHOICES[Math.floor(Math.random() * GAME_CHOICES.length)];
}

function setLocalStorage() {
  localStorage.setItem("total games", stats.totalGames);
  localStorage.setItem("wins", stats.userWins);
  localStorage.setItem("losses", stats.userLosses);
  localStorage.setItem("draws", stats.userDraws);
  localStorage.setItem("All-Time Record", userRecord);
}

function updateGameResults(str) {
  stats.totalGames++;
  if (str === "win") {
    stats.userWins++;
    alert(`GAME:${stats.totalGames} YOU WIN, ${userRecord}`);
  } else if (str === "lose") {
    stats.userLosses++;
    alert(`GAME:${stats.totalGames} YOU LOSE, ${userRecord}`);
  } else if (str === "draw") {
    stats.userDraws++;
    alert(`GAME:${stats.totalGames} DRAW, ${userRecord}`);
  }
  userRecord = `Your All-Time Record is: ${stats.userWins}-${stats.userLosses}-${stats.userDraws}`;
  setLocalStorage();
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
  } else if (user === cpu) {
    result = "draw";
  }

  updateGameResults(result);
  restartGame(game, userCallback, cpuCallback);
}
game(userPick, cpuPick);

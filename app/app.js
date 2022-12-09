/* Zaydee Dominguez-Chang || N220 Final Project || Tic Tac Toe with HTML and JavaScript || Due 12/10/2022 */

//declare the variables needed for the game
let cells = document.querySelectorAll(".cell"); // getting the class name called cell from the html file
let statusText = document.getElementById("statusText"); // getting the id called statusText from the html file
let restartBtn = document.getElementById("restartBtn"); // getting the id on the button called restartBtn from the html file

// this variable is a 2D array with different win conditions for the game
let winConditions = [ //checking rows, columns, and diagonals
    //checking the rows
    [0, 1, 2], //first row
    [4, 5, 6], //second row
    [6, 7, 8], //third row

    //checking the columns
    [0, 3, 6], // first column
    [1, 4, 7], //second column
    [2, 5, 8], //third column

    //checking the diagonals 
    [0, 4, 8], //first diagonal
    [2, 4, 6], //second diagonal
];

//this is an array of placeholders called options, they will originally be empty strings
let options = ["", "", "", "", "", "", "", "", "",];

//variable to keep track of the current player
let currentPlayer = "X"; //the inital player will be X

//variable to keep track of game runtime
let running = false; // this will be changed to true once game is started

startGame();//run the startgame function so the computer knows immediately to begin

function startGame() {// function to begin the game, will take care of setup before starting
    //adding event listeners to the cells 
   cells.forEach(cell => cell.addEventListener("click", cellClicked)); //when the cell is clicked, add a callback of the cellClicked function

    //updating the status text to match the game status
    statusText.innerHTML = `${currentPlayer}'s turn.`;

    //when game is initialized, run the game
    running = true;

}


function cellClicked() {//function when cell is clicked
    //local variable refering to a cell
    let cellIndex = this.getAttribute("cellIndex"); //this refers to whatever cell is being clicked; getting attribute called cellIndex from the html

    //want to check if the index number within our option placeholder is not empty, only want to update the cell if nothing is there
    if(options[cellIndex] != "" || !running) { //if the options at index of cellIndex doesnt equal an empty space OR game is not running
        return; // we will return, not do anything
    }

    updateCell(this, cellIndex); //otherwise invoke the updateCell function passing this as an argument as well as cell index
    // changePlayer();
    checkWinner(); // this has to be followed by the checkWinner function to see who is winning the game
}


function updateCell(cell, index) {//this function is meant to update the cells accordingly 
    options[index] = currentPlayer; //updating the placeholders to be of the currentPlayer's move
    cell.innerHTML = currentPlayer; //update the HTML of the cell content to be whatever marker is the current player's
}


function changePlayer() {//change the current player to be a different marker
    if (currentPlayer =="X") { // if current player is equal to X
        currentPlayer = "O"; //change the player's marker to be O
    } else {
        currentPlayer = "X"; //otherwise the marker should be X
    }
    statusText.innerHTML = `${currentPlayer}'s turn.`; //change the statusText html to match to whoever's turn it is accordingly
}

function checkWinner() { //function to see if there is a winner that needs to be declared
    let roundWon = false; //temporary variable

    for(let i = 0; i < winConditions.length; i++) { //for loop to iterate over all win conditions in the array

        //store each array in temporary variable
        let conditions = winConditions[i]; // variable to tell which condition at the current index

        //three indeces
        let cellA = options[conditions[0]]; 
        let cellB = options[conditions[1]]; 
        let cellC = options[conditions[2]]; 

        //need to check for empty spaces to declare a winner
        if (cellA  == "" || cellB == "" || cellC == ""){//if any of the cells are equal to empty space (if there is an empty space anywhere)
            continue; //continue the game (don't do anything)
        } 
        
        //if there are no empty spaces, check to see they are the same character 
        if (cellA == cellB && cellB == cellC) { //if all the cells match up to each other , meaning if someone got the same marker 3x
            roundWon = true;// setting this equal to true because there is a winner now
            break; //do not continue game, there is a winner
        }
    }

    //if statement to check game status while the game is playing
    if(roundWon){ //if there is a winner
        statusText.innerHTML = `${currentPlayer} wins!`; //change the status text to match to the winner
        running = false; //set running to false, so stop the game

    } else if (!options.includes("")) { //if there is a draw (if there are no empty spaces but no cells match)
        statusText.innerHTML = `Draw!`; //change the status text to display there is a draw
        running = false; //set running to false, so stop the game

    } else { //if there isn't a winner or a draw
        changePlayer(); //invoke the changePLayer function to keep the game running and keep switching off 
    }
}

function restartGame() { //this is the function that will restart the game once a round is over
    currentPlayer = "X";  //take the current player and set it default back to be X
    options = ["", "", "", "", "", "", "", "", "",]; //take the options to be blank so no winner is accidentally defined
    statusText.innerHTML = `${currentPlayer}'s turn.`; //give back the original instructions

    cells.forEach(cell => cell.innerHTML = ""); //set the cells to be blank from the start
    running = true; //set the running game to true, so start a game and start all functions

}

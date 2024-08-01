// This assignment is inspired by a problem on Exercism (https://exercism.org/tracks/javascript/exercises/etl) that demonstrates Extract-Transform-Load using Scrabble's scoring system. 

const { runCLI } = require("jest");
const input = require("readline-sync");

let userInput= ""; 

const oldPointStructure = {
  1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
  2: ['D', 'G'],
  3: ['B', 'C', 'M', 'P'],
  4: ['F', 'H', 'V', 'W', 'Y'],
  5: ['K'],
  8: ['J', 'X'],
  10: ['Q', 'Z']
};

function oldScrabbleScorer(word) {
	word = word.toUpperCase();
	let letterPoints = "";
 
	for (let i = 0; i < word.length; i++) {
 
	  for (const pointValue in oldPointStructure) {
 
		 if (oldPointStructure[pointValue].includes(word[i])) {
			letterPoints += `Points for '${word[i]}': ${pointValue}\n`
		 }
 
	  }
	}
	return letterPoints;
 }

// your job is to finish writing these functions and variables that we've named //
// don't change the names or your program won't work as expected. //

function initialPrompt() {
   userInput = input.question("Let's play some scrabble! Enter a word to score:");
 };

function simpleScorer(userInput) {
  let score = 0;
   for (let i = 0; i < userInput.length; i++){
    score +=1
   }
return score};

function vowelBonusScorer(userInput) {
  let score = 0;
   for (let i = 0; i < userInput.length; i++){
    if (["a","e","i","o","u"].includes(userInput[i].toLowerCase())){
      score += 3
    } else {
      score +=1
    }
   }
return score
};

let newPointStructure = transform(oldPointStructure); 


function scrabbleScorer(word) {
  word = word.toLowerCase();
	let score = 0;
	for (let i = 0; i < word.length; i++) {
	  score += newPointStructure[word[i]];
}
  console.log(`score for ${word}: ${score}`);
	return score;
};

const scoringAlgorithms = [ {
  name: "Simple Scorer",
  description: "Each letter is worth 1 point.",
  scorerFunction: simpleScorer,},

 { name: "Bonus Vowels",
  description: "Vowels are 3 pts, consonants are 1 pt.",
  scorerFunction: vowelBonusScorer, },

 { name: "Scrabble Scorer",
  description: "The traditional scoring algorithm.",
  scorerFunction: scrabbleScorer, }];

function scorerPrompt() {
  let scoringSelection = input.question("Please select your scoring algorithm as one of the following: 0 for Simpler Scoring, 1 for Vowel Bonus Scoring, or 2 for Classic Scrabble scoring.");  
   console.log("algorithm name: ", scoringAlgorithms[scoringSelection].name);
   console.log(`scorerFunction result for ${userInput}:`, scoringAlgorithms[scoringSelection].scorerFunction(userInput));
  
}

function transform(oldPointStructure) {
  let transformedObject = {}; 
  for (item in oldPointStructure) {
    for (let i = 0; i < oldPointStructure[item].length ; i++) {
      transformedObject[oldPointStructure[item][i].toLowerCase()] = Number(item);
   }
  }
  return transformedObject
};

function runProgram() {
   initialPrompt();
    scorerPrompt();
  }

// Don't write any code below this line //
// And don't change these or your program will not run as expected //
module.exports = {
   initialPrompt: initialPrompt,
   transform: transform,
   oldPointStructure: oldPointStructure,
   simpleScorer: simpleScorer,
   vowelBonusScorer: vowelBonusScorer,
   scrabbleScorer: scrabbleScorer,
   scoringAlgorithms: scoringAlgorithms,
   newPointStructure: newPointStructure,
	runProgram: runProgram,
	scorerPrompt: scorerPrompt
};

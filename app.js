// Get HTML elements
const qwerty = document.getElementById('qwerty');
const phrase = document.getElementById('phrase');
let missed = 0;

// Array of phrases
const phrases = [
  'JavaScript is fun',
  'Web development rocks',
  'OpenAI is awesome',
  'Coding is life',
  'HTML and CSS'
];

// Hide start button
const startButton = document.querySelector('.btn__reset');
const overlay = document.getElementById('overlay');

// Event listener for the "Start Game" button
startButton.addEventListener('click', () => {
  overlay.style.display = 'none'; // Hide the start overlay
  startGame(phraseArray); // Start the game when the button is clicked
});

// Function to get a random phrase as an array of characters
function getRandomPhraseAsArray(arr) {
  const randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex].split('');
}

// Function to set up the game display
function startGame(arr) {
  const ul = phrase.querySelector('ul');
  ul.innerHTML = '';

  for (let i = 0; i < arr.length; i++) {
    const li = document.createElement('li');
    li.textContent = arr[i];

    if (arr[i] !== ' ') {
      li.classList.add('letter'); // Add 'letter' class to letters
    } else {
      li.classList.add('space'); // Add 'space' class to spaces
    }

    ul.appendChild(li);
  }
}

// Get a random phrase and start the game
const phraseArray = getRandomPhraseAsArray(phrases);

// Function to check if a letter is in the phrase
function checkLetter(button) {
  const letters = document.querySelectorAll('.letter');
  let letterFound = null;

  letters.forEach((letter) => {
    if (letter.textContent.toLowerCase() === button.textContent.toLowerCase()) {
      letter.classList.add('show'); // Show the letter
      letterFound = letter.textContent;
    }
  });

  return letterFound;
}

// Event listener for keyboard clicks
qwerty.addEventListener('click', (e) => {
  if (e.target.tagName === 'BUTTON') {
    e.target.classList.add('chosen'); // Mark the chosen letter
    e.target.disabled = true; // Disable the clicked button

    const letterFound = checkLetter(e.target);

    if (!letterFound) {
      const tries = document.querySelectorAll('.tries');
      const lostHeart = document.createElement('img');
      lostHeart.src = 'images/lostHeart.png';
      lostHeart.height = '35px';
      lostHeart.width = '30px';
      tries[missed].innerHTML = '';
      tries[missed].appendChild(lostHeart);
      missed++; // Increase missed count and display a lost heart
    }

    checkWin(); // Check if the game is won or lost
  }
});

// Function to check if the game is won or lost
function checkWin() {
  const letterElements = document.querySelectorAll('.letter');
  const showElements = document.querySelectorAll('.show');

  if (letterElements.length === showElements.length) {
    overlay.className = 'win';
    overlay.style.display = 'flex';
    overlay.querySelector('.title').textContent = 'Congratulations! You Win!';
    startButton.textContent = 'Play Again';
  } else if (missed >= 5) {
    overlay.className = 'lose';
    overlay.style.display = 'flex';
    overlay.querySelector('.title').textContent = 'Sorry, You Lose. Try Again!';
    startButton.textContent = 'Try Again';
  }
}

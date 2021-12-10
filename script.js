// ================= CODE TO MAKE DECK, SHUFFLE, AND CREATE SHUFFLED DECK ==============

const makeDeck = () => {
  // Initialise an empty deck array
  const newDeck = [];
  // Initialise an array of the 4 suits in our deck. We will loop over this array.
  const suits = ['hearts', 'diamonds', 'clubs', 'spades'];
  const suitSymbol = ['♥', '◈', '♣', '♠'];

  // Loop over the suits array
  for (let suitIndex = 0; suitIndex < suits.length; suitIndex += 1) {
    // Store the current suit in a variable
    const currentSuit = suits[suitIndex];
    const currentSuitSymbol = suitSymbol[suitIndex];

    // Code to create colour for the cards, based on the suits

    let cardColour = "";
    // Create a variable for the colour, based on the suits
    if (currentSuit === 'hearts' || currentSuit === 'diamonds'){
      cardColour = "red";
    } else if (currentSuit === 'clubs' || currentSuit === 'spades'){
      cardColour = "black";
    }

    // Loop from 1 to 13 to create all cards for a given suit
    // Notice rankCounter starts at 1 and not 0, and ends at 13 and not 12.
    // This is an example of a loop without an array.
    for (let rankCounter = 1; rankCounter <= 13; rankCounter += 1) {
      // By default, the card name is the same as rankCounter
      let cardName = `${rankCounter}`;
      let displayNameText = `${rankCounter}`;

      // If rank is 1, 11, 12, or 13, set cardName to the ace or face card's name
      if (cardName === '1') {
        cardName = 'ace';
        displayNameText = 'A';
      } else if (cardName === '11') {
        cardName = 'jack';
        displayNameText = 'J';
      } else if (cardName === '12') {
        cardName = 'queen';
        displayNameText = 'Q'
      } else if (cardName === '13') {
        cardName = 'king';
        displayNameText = 'K';
      }

      // Create a new card with the current name, suit, and rank
      const card = {
        suitSymbol: currentSuitSymbol,
        suit: currentSuit,
        name: cardName,
        displayName: displayNameText,
        colour: cardColour,
        rank: rankCounter,
      };

      // Add the new card to the deck
      newDeck.push(card);
    }
  }

  // Return the completed card deck
  return newDeck;
};

// Get a random index ranging from 0 (inclusive) to max (exclusive).
const getRandomIndex = (max) => Math.floor(Math.random() * max);

// Shuffle an array of cards
const shuffleCards = (cards) => {
  // Loop over the card deck array once
  for (let currentIndex = 0; currentIndex < cards.length; currentIndex += 1) {
    // Select a random index in the deck
    const randomIndex = getRandomIndex(cards.length);
    // Select the card that corresponds to randomIndex
    const randomCard = cards[randomIndex];
    // Select the card that corresponds to currentIndex
    const currentCard = cards[currentIndex];
    // Swap positions of randomCard and currentCard in the deck
    cards[currentIndex] = randomCard;
    cards[randomIndex] = currentCard;
  }
  // Return the shuffled deck
  return cards;
};

const deck = shuffleCards(makeDeck());

// ================ GLOBAL VARIABLES ====================== //

let playerHand = [];
let playerCard;


const cardContainer = document.createElement('div');
cardContainer.classList.add('cardContainer');
cardContainer.innerText = "";
document.body.appendChild(cardContainer);

const dealButton = document.createElement('button');
dealButton.id = "deal-button-id";
dealButton.classList.add('deal-button');
dealButton.innerText = "deal";
document.body.appendChild(dealButton);


// Function to create card body, and append into cardContainer on screen

const createCard = (cardInfo) => {
  const suit = document.createElement('div');
  suit.classList.add('suit');
  suit.innerText = cardInfo.suitSymbol;

  const name = document.createElement('div');
  name.classList.add("name", cardInfo.colour);
  name.innerText = cardInfo.displayName;

  const card = document.createElement('button');
  card.classList.add('card');

  card.appendChild(name);
  card.appendChild(suit);

  return card;
};

// Function that draws the 5 cards everytime player clicks "deal"

const clickDealButton = () => {
  console.log(`deal button clicked, players' hand has 5 cards`);
  // create loop to push 5 cards into playerHand
  for (let i = 0; i < 5; i+= 1){
    playerCard = deck.pop();
    playerHand.push(playerCard);
    // Create the body of card from card metadata
    const cardElement = createCard(playerCard);
    cardContainer.appendChild(cardElement);
    // Add event listener to each card
    cardElement.addEventListener('click', () => removeCardFromHand(playerHand[i]));
  };
}

// Function that lets player remove the unwanted card from their hand

const removeCardFromHand = (card) => {
  console.log(`remove this card`);
  console.log(card);
  // using the splice method to remove this card from playerHand
  // loop through the array and match this card with the position
  // if array === card, use splice method to remove the card
  for (i = 0; i < playerHand.length; i += 1){
    const currentCard = card;
    if (playerHand[i] === currentCard){
      playerHand.splice(i,1);
    }
  }
  emptyCardContainer(playerHand);
}

// Function emptys cardContainer and appends the remaining cards on the screen
const emptyCardContainer = (playerHand) => {
  cardContainer.innerText = "";
  for (let i = 0; i < playerHand.length; i += 1){
    const currentCard = createCard(playerHand[i]);
    cardContainer.appendChild(currentCard);
    currentCard.addEventListener('click', () => removeCardFromHand(playerHand[i]));
  }
}

dealButton.addEventListener('click', clickDealButton);

// rebuilds the cardContainer everytime player clicks "removeCardFromHand", reflecting only the cards that the player still wants
// const buildCardDisplay = (playerHand) => {
// // Create cardContainer element (Function - Will display the cards dealt when player clicks on button)



// // Create deal button element (Once clicked, will direct the game to push 5 cards into players' hand)

// }


// Function to initiatlise game

// const initGame = () => {
//   buildCardDisplay(playerHand);
// }

// initGame();



// need to figure out how player can keep the cards they want, and swop the ones they dont want

// after swopping, game calculates the hand score (calcHandScore) and updates total points

// ======== PRIMARY GAME LOGIC ================== //

// 1. create empty helper function called calcHandScore
// 2. calcHandScore will take an array of card objects and return the number of points that the user scored for the cards in their hand


// emojiArr = ["✌","😂","😝","😁","😱","👉","🙌","🍻","🔥","🌈","☀","🎈","🌹","💄","🎀","⚽","🎾","🏁","😡","👿","🐻","🐶","🐬","🐟","🍀","👀","🚗","🍎","💝","💙","👌","❤","😍","😉","😓","😳","💪","💩","🍸","🔑","💖","🌟","🎉","🌺","🎶","👠","🏈","⚾","🏆","👽","💀","🐵","🐮","🐩","🐎","💣","👃","👂","🍓","💘","💜","👊","💋","😘","😜","😵","🙏","👋","🚽","💃","💎","🚀","🌙","🎁","⛄","🌊","⛵","🏀","🎱","💰","👶","👸","🐰","🐷","🐍","🐫","🔫","👄","🚲","🍉","💛","💚"]

// const btnContainer = document.createElement("div");

// const emojiContainer = document.createElement("div");
// emojiContainer.innerHTML = '';

// // set a global buttons array
// let btnArr;
// btnArr = [];

// for (let i = 0; i < emojiArr.length; i += 1) {
//   btnArr[i] = document.createElement("BUTTON");
//   btnArr[i].innerHTML = emojiArr[i];
//   btnContainer.appendChild(btnArr[i]);
// }

// document.body.appendChild(btnContainer);
// document.body.appendChild(emojiContainer);

// // drawing the emoji

// // helper function for drawing emojis
// const drawEmoji = (emoji) => {
//   emojiContainer.innerHTML = '';
//   let printEmojis;
//   printEmojis = document.createElement('p');
//   for (let i = 0; i < 3; i += 1) {
//     for (let j = 0; j < 3; j += 1) {
//       printEmojis.innerHTML += emoji;
//     }
//     printEmojis.innerHTML += '<br/>';
//   }
//   emojiContainer.appendChild(printEmojis);
// };

// // draw emojis *when* the user clicks the button
// for (let i = 0; i < btnArr.length; i += 1) {
//   btnArr[i].addEventListener('click', () => drawEmoji(btnArr[i].innerText));
// }

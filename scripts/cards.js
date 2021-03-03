
let baseUri = 'https://deckofcardsapi.com/api/deck/';

let drawCardButton = document.querySelector("#draw-card");
let newDeckButton = document.querySelector('#new-deck');
let shuffleDeckButton = document.querySelector('#shuffle-deck');
let cardPictureSpace = document.querySelector("#card-pic");

let deckId = 'new';

newDeckButton.addEventListener('click', () => {
    deckId = 'new';
    // Clear the contents of the card viewing area
    cardPictureSpace.textContent = '';
})

drawCardButton.addEventListener('click', getCard);

function getCard() {
    let actionCmd = 'draw'; // For when we need other actions
    let numberOfCards = 1;  // In case we want to expand in the future to fetching multiple cards at once
    let uri = baseUri + deckId + "/" + actionCmd + "/?count=" + numberOfCards;
    fetch(uri)
        .then((response) => response.json())
        .then((data) => {
            //console.log(data);
            // Get the deck ID and the URL to the card image
            deckId = data.deck_id;
            let imgSrc = data.cards[0].image;

            // Header of the card div element
            let cardName = `${data.cards[0].value} of ${data.cards[0].suit}`;
            const cardHeader = document.createElement('h5');
            cardHeader.classList.add('card-header');
            cardHeader.classList.add('text-center');
            cardHeader.innerText = cardName;

            // Card image
            const cardImage = document.createElement('img');
            cardImage.setAttribute('src', imgSrc);
            cardImage.classList.add('card-img');
            cardImage.setAttribute('alt', `Picture of the ${cardName}`);
            
            // Body of the card div element
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
            cardBody.innerHTML = [
                `<ul class="list-group list-group-flush">`,
                    `<li class="list-group-item">Deck ID: ${data.deck_id}</li>`,
                    `<li class="list-group-item">Cards remaining: ${data.remaining}</li>`,
                `</ul>`
            ].join('\n');
            
            // Clear all previous contents
            cardPictureSpace.textContent = '';

            // Add new HTML to the card container
            cardPictureSpace.appendChild(cardHeader);
            cardPictureSpace.appendChild(cardImage);
            cardPictureSpace.appendChild(cardBody);
        })
        .catch((err) => {
            console.error(err);
        });
}

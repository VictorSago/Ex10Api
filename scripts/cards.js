
let baseUri = 'https://deckofcardsapi.com/api/deck/';

let drawCardButton = document.querySelector("#draw-card");
let newDeckButton = document.querySelector('#new-deck');
let shuffleDeckButton = document.querySelector('#shuffle-deck');
let cardPictureSpace = document.querySelector("#card-pic");

let deckId = 'new';

newDeckButton.addEventListener('click', () => {
    console.log('Previous deck ID: ', deckId);
    deckId = 'new';
    cardPictureSpace.textContent = '';
})

drawCardButton.addEventListener('click', getCard);

function getCard() {
    let actionCmd = 'draw';
    let numberOfCards = 1;
    let uri = baseUri + deckId + "/" + actionCmd + "/?count=" + numberOfCards;
    //console.log(uri);
    fetch(uri)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let imgSrc = data.cards[0].image;
            deckId = data.deck_id;
            console.log(deckId);
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', imgSrc);
            cardPictureSpace.textContent = '';
            cardPictureSpace.appendChild(imgElement);
        })
        .catch((err) => {
            console.error(err);
        });
}

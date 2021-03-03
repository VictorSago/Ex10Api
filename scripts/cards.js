
let baseUri = 'https://deckofcardsapi.com/api/deck/';

let drawCardButton = document.querySelector("#draw-card");
let cardPictureSpace = document.querySelector("#card-pic");

drawCardButton.addEventListener('click', getCard);

let deckId = 'new';

function getCard() {
    let actionCmd = 'draw';
    let numberOfCards = 1;
    let uri = baseUri + deckId + "/" + actionCmd + "/?count=" + numberOfCards;
    console.log(uri);
    fetch(uri)
        .then((response) => response.json())
        .then((data) => {
            console.log(data);
            let imgSrc = data.cards[0].image;
            console.log(imgSrc);
            const imgElement = document.createElement('img');
            imgElement.setAttribute('src', imgSrc);
            cardPictureSpace.textContent = '';
            cardPictureSpace.appendChild(imgElement);
        })
        .catch((err) => {
            console.error(err);
        });
}

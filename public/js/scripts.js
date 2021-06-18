// fetch('/deck').then((response) => {
//     if(response.ok) {
//         response.json().then((json) => {
//             console.log(json);
//         });
//     }
// })

const createCardCorner = (number, symbol) => { 
    return `<div class="card-corner top-left">
    <div>${number}</div>
    <div>${symbol}</div>
    </div>`;
}


const createCard = (number, symbol, flip) => {
    const isNumber = !isNaN(number);
    const cardDiv = document.createElement('div');

    cardDiv.classList.add('card');
    cardDiv.setAttribute('symbol', symbol);
    cardDiv.setAttribute('number', number);

    // ${(['J', 'Q', 'K'].includes(number)) ? 
    cardDiv.innerHTML = `${createCardCorner(number, symbol)}
    <div class="symbols">
        
        ${(number === "A") ? `<div>${symbol}</div>`:''}

        ${(number === "J" || number === "Q" || number === "K") ? `<div class="image"></div>`:""}

        ${(isNumber) ? `${new Array(parseInt(number))
        .fill(symbol)
        .map((cardSymbol) => `<div class="${number}">${cardSymbol}</div>`)
        .join('')
        }` : ''}
    </div>
    ${createCardCorner(number, symbol)}`;

    cardDiv.addEventListener('click', () => {
        if(cardDiv.classList.contains('flipped')){
            cardDiv.classList.remove('flipped');
        } else {
            cardDiv.classList.add('flipped');
            var elem = document.getElementsByClassName('symbols');
            elem.parentNode
        }
        
    })

    if(flip){
      cardDiv.classList.add('flipped');
    }

    return cardDiv;

}

// const createDeck = async (selector, path) => {
//   const container = document.querySelector(selector);
//   const cards = await(await fetch(path)).json();
//   cards.forEach((card) => container.append(createCard(card)));
// };

window.addEventListener('load', function() {
    const containerTable = document.querySelector('.deck.table')

    const container = document.querySelector('.deck.hand');

    (async () => {
        // const response = await fetch('/deck');
        // if(response.ok){
        //     const json  = await response.json();
        //     console.log(json);
        // } else {
        //     console.error('response is not ok');
        // }
    
        //const {cards} = await(await fetch('/deck')).json();

        // await createDeck('.deck.table', '/table');
        // const handSize = 5;
        // await createDeck('.deck.hand', `/deck/${handSize}`)
        const table = await(await fetch(`/table`)).json();
        
        table.forEach((card, index) => {
            const number = card.slice(0, -1);
            const symbol = card.slice(-1);
            const flip = 2;
    
            containerTable.append(createCard(number, symbol, (index < flip)));
        }); 
        
        const handSize = 2;
        const deck = await(await fetch(`/deck/${handSize}`)).json();
        
        deck.forEach((card, index) => {
            const number = card.slice(0, -1);
            const symbol = card.slice(-1);
            const flip = handSize;
    
            container.append(createCard(number, symbol, (index < flip)));
        });    

    })();
})




{/* <div class="deck">${deck.cards
        .map((card) => {
          const number = card.slice(0, -1);
          const symbol = card.slice(-1);
          const isNumber = !isNaN(number);
          return `<div class="card" symbol="${symbol}" number="${number}">
            <div class="card-corner top-left">
              <div>${number}</div>
              <div>${symbol}</div>
            </div>
            <div class="symbols" number="">
              ${(isNumber) ? `${new Array(parseInt(number))
                .fill(symbol)
                .map((cardSymbol) => `
                  <div class="${number}">${cardSymbol}</div>
                `)
                .join('')
              }` : ''}
            </div>
            <div class="card-corner bottom-right">
              <div>${number}</div>
              <div>${symbol}</div>
            </div>
          </div>`
        })
        .join('')
      }</div> */}

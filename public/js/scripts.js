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

const createCardBack = () => {
    return `<div class="back"></div>`;
}


const createCard = (number, symbol) => {
    const isNumber = !isNaN(number);
    const cardDiv = document.createElement('div');

    cardDiv.classList.add('card');
    cardDiv.setAttribute('symbol', symbol);
    cardDiv.setAttribute('number', number);

    // ${(['J', 'Q', 'K'].includes(number)) ? 
    cardDiv.innerHTML = `${createCardCorner(number, symbol)}
    <div class="symbols" number="">
        <div class="front">
        ${(number === "A") ? `<div>${symbol}</div>`:''}

        
        ${(number === "J" || number === "Q" || number === "K") ? 
            `<div class="image"></div>`:""}

        ${(isNumber) ? `${new Array(parseInt(number))
        .fill(symbol)
        .map((cardSymbol) => `
            <div class="${number}">${cardSymbol}</div>
        `)
        .join('')
        }` : ''}
        </div>
        ${createCardBack()}
    </div>
    ${createCardCorner(number, symbol)}`;

    cardDiv.addEventListener('click', () => {
        if(cardDiv.classList.contains('flipped')){
            cardDiv.classList.remove('flipped');
        } else {
            cardDiv.classList.add('flipped');
        }
        
    })

    return cardDiv;
}

window.addEventListener('load', function() {
    const container = document.querySelector('.deck');
    const handSize = 5;

    (async () => {
        // const response = await fetch('/deck');
        // if(response.ok){
        //     const json  = await response.json();
        //     console.log(json);
        // } else {
        //     console.error('response is not ok');
        // }
    
        //const {cards} = await(await fetch('/deck')).json();
        const deck = await(await fetch(`/deck/${handSize}`)).json();    
        
        deck.forEach((card) => {
            const number = card.slice(0, -1);
            const symbol = card.slice(-1);
    
            container.append(createCard(number, symbol));
            
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

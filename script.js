document.addEventListener('DOMContentLoaded', () => {
    const gameBoard = document.getElementById('game-board');
    const startBtn = document.getElementById('start-btn');
    const difficultySelect = document.getElementById('difficulty');
    const movesDisplay = document.getElementById('moves');

    const symbols = [
        '🍎', '🍌', '🍇', '🍊', '🍉', '🍒', 
        '🚗', '🚀', '🚲', '🚢', '🚁', '🚉',
        '🐶', '🐱', '🐭', '🐹', '🐰', '🦊',
        '🌞', '🌈', '🌙', '🌍', '🌋', '🌷',
        '⚽', '🏀', '🏈', '⚾', '🎾', '🏉'
    ];

    let cards = [];
    let flippedCards = [];
    let matchedPairs = [];
    let moves = 0;
    let gameStarted = false;

    function generateCards(level) {
        const cardCount = [6, 12, 18, 24, 30][level - 1];
        gameBoard.innerHTML = '';
        gameBoard.style.gridTemplateColumns = `repeat(${Math.ceil(Math.sqrt(cardCount))}, 1fr)`;
        
        const selectedSymbols = symbols.slice(0, cardCount / 2);
        const cardSet = [...selectedSymbols, ...selectedSymbols]
            .sort(() => Math.random() - 0.5);

        cardSet.forEach((symbol, index) => {
            const card = document.createElement('div');
            card.classList.add('card');
            card.dataset.symbol = symbol;
            card.dataset.index = index;
            card.textContent = '❓';
            card.addEventListener('click', handleCardFlip);
            gameBoard.appendChild(card);
        });
    }

    function handleCardFlip(event) {
        const card = event.target;
        
        if (!gameStarted || 
            flippedCards.length === 2 || 
            card.classList.contains('flipped') || 
            card.classList.contains('matched')) {
            return;
        }

        card.classList.add('flipped');
        card.textContent = card.dataset.symbol;
        flippedCards.push(card);

        if (flippedCards.length === 2) {
            moves++;
            movesDisplay.textContent = moves;

            if (flippedCards[0].dataset.symbol === flippedCards[1].dataset.symbol) {
                flippedCards.forEach(c => c.classList.add('matched'));
                matchedPairs.push(flippedCards[0].dataset.symbol);
                flippedCards = [];

                if (matchedPairs.length === symbols.slice(0, cards.length / 2).length) {
                    alert(`축하합니다! ${moves}번의 시도 만에 게임을 완료했습니다!`);
                    gameStarted = false;
                    startBtn.disabled = false;
                }
            } else {
                setTimeout(() => {
                    flippedCards.forEach(c => {
                        c.classList.remove('flipped');
                        c.textContent = '❓';
                    });
                    flippedCards = [];
                }, 1000);
            }
        }
    }

    startBtn.addEventListener('click', () => {
        const difficulty = parseInt(difficultySelect.value);
        generateCards(difficulty);
        
        moves = 0;
        movesDisplay.textContent = moves;
        matchedPairs = [];
        gameStarted = true;
        startBtn.disabled = true;
    });
});
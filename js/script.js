const cards = [
	{name: "bellsprout",image: "bellsprout.png"},
	{name: "bullbasaur",image: "bullbasaur.png"},
	{name: "caterpie", 	image: "caterpie.png"},
	{name: "charmander",image: "charmander.png"},
	{name: "eevee", 	image: "eevee.png"},
	{name: "meowth", 	image: "meowth.png"},
	{name: "mew", 		image: "mew.png"},
	{name: "pikachu", 	image: "pikachu.png"},
	{name: "psyduck", 	image: "psyduck.png"},
	{name: "rattata", 	image: "rattata.png"},
	{name: "squirtle", 	image: "squirtle.png"}
	];

const gameContainer = document.getElementById("grid-container");

function shuffleArray(cards) {
	cards.sort(() => Math.random() - 0.5);
	return cards;
}

function selectCards() {
	let tempArray = shuffleArray(cards);
	let selectedCards = [];

	for(let i = 0; i < 8; i++) {
		let randomIndex = Math.floor(Math.random() * tempArray.length);
		selectedCards.push(tempArray[randomIndex]);
		tempArray.splice(randomIndex, 1);
	}

	return selectedCards;
}

function checkCombination(firstCard, secondCard) {
	const activatedCards = document.querySelectorAll(".card-container.active");
	if(firstCard == secondCard) {
		activatedCards.forEach((card) => {
			card.classList.remove("active");
		});
	}
	else {
		activatedCards.forEach((card) => {
			let wait = setTimeout(() => {
				card.classList.remove("active");
				card.classList.remove("flipped");
			}, 1000);
		});
	}
}

function addCardsEvents() {
	const cards = document.querySelectorAll(".card-container");
	var firstCard = null;
	var secondCard = null;

	cards.forEach((card) => {
		card.addEventListener("click", function() {
			if(firstCard == null) {
				firstCard = card.getAttribute("card-name");
				card.classList.add("active");
				card.classList.add("flipped");
			}
			else {
				if(secondCard == null) {
					if(!card.classList.contains("active")) {
						secondCard = card.getAttribute("card-name");
						card.classList.add("active");
						card.classList.add("flipped");
						checkCombination(firstCard, secondCard);
						firstCard = null;
						secondCard = null;
					}
				}
			}
		});
	});
}

function generateCards() {
	var selectedCards = selectCards();
	var gridCards = [...selectedCards, ...selectedCards];

	gridCards = shuffleArray(gridCards);

	gridCards.forEach((card) => {
		// console.log(card.image);
		gameContainer.innerHTML += `<div class="card-container" card-name="${card.name}">
		<img class="back-card" src="img/pokebola.png">
		<img class="front-card" src="img/${card.image}">
		</div>`;
	});

	addCardsEvents();
}

generateCards();
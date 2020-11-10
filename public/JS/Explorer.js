

function CarouselTimer() {
	// Timer automático do Carousel
	var CarouselTimerFun = setInterval(function(){
	var Card = document.getElementsByClassName('cardActive')[0],
		cardId = parseInt(Card.getAttribute('id').replace(/[^0-9]/g,'')),
		nextCard = document.getElementById('Card'+(cardId+1));

		if ($(window).width() > 540) {
			if (nextCard != undefined) {
				ClaimNextCard(Card, nextCard);
			}
				else {
				ClaimFirstCard(Card);
			}
		} else {
			if (nextCard != undefined) {
				SwitchCardMobile(Card, nextCard);
			}
				else {
				SwitchCardMobile(Card, document.getElementById('Card0'));
			}
		}
	}, 4500);
	}

function SwitchCardMobile (Card, nextCard) {
	Card.classList.remove('cardActive');
	Card.classList.add('cardDisable');
	nextCard.classList.remove('cardDisable');
	nextCard.classList.add('cardActive');
	
}

function ClaimNextCard (Card, nextCard) {
	// Chama o próximo item do Carousel - Animação de ida
		Card.classList.remove('cardActive');
		Card.classList.add('cardDown');
		setTimeout(function(){
			Card.classList.remove('cardDown');
			Card.classList.add('cardDisable');
			}, 400);
			nextCard.classList.remove('cardDisable');		
			nextCard.classList.add('cardAssemble');
			setTimeout(function(){
				nextCard.classList.remove('cardAssemble');
				nextCard.classList.add('cardActive');
			}, 400);
}

function ClaimFirstCard (Card) {
	// Chama o primeiro item do carousel - Animação de volta
	var firstCard = document.getElementById('Card0');
		firstCard.classList.remove('cardDisable');
		firstCard.classList.add('cardAssemble');
		setTimeout(function(){
			firstCard.classList.remove('cardAssemble');
			firstCard.classList.add('cardActive');
		}, 400);
		Card.classList.remove('cardActive');		
		Card.classList.add('cardDown');
		setTimeout(function(){
			Card.classList.remove('cardDown');
			Card.classList.add('cardDisable');
		}, 400);
	}
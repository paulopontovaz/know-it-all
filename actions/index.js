export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const GET_CARDS = 'GET_CARDS'
export const ADD_CARD = 'ADD_CARD'

function getAllDecks (decks) {
	return {
		type: GET_ALL_DECKS,
		decks
	}
}

function addDeck (deck)  {
	return {
		type: ADD_DECK,
		deck
	}
}

function getCards (cards) {
	return {
		type: GET_CARDS,
		cards
	}
}

function addCard (card)  {
	return {
		type: ADD_CARD,
		card
	}
}

/*
	TODO: Implement functions below using AsyncStorage
	1) The 'title' property of a deck must be unique. Validate that before letting someone add a deck.
*/
export function fetchAllDecks () {	
	// decks.reduce((deckList, deck) => {
	// 	deckList[convertStringToPropName(deck.title)] = deck
	// 	return deckList
	// }, {})
}

export function insertDeck (deck) {

}

export function fetchCards (deckTitle) {
	//convertStringToPropName(deck.title)
}

export function insertCard (deckTitle, card) {

}
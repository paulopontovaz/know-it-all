import * as API from '../util/api'

export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_CARD = 'DELETE_CARD'

function getAllDecks (decks) {
	return {
		type: GET_ALL_DECKS,
		decks,
	}
}

function addDeck (newDeck)  {
	return {
		type: ADD_DECK,
		newDeck,
	}
}

function deleteDeck (deckTitle)  {
	return {
		type: ADD_DECK,
		deckTitle,
	}
}

function addCard (card, deckTitle)  {
	return {
		type: ADD_CARD,
		newCard,
		deckTitle,
	}
}

function deleteCard (card, deckTitle)  {
	debugger
	return {
		type: ADD_DECK,
		card,
		deckTitle,
	}
}

/*
	TODO: Implement functions below using AsyncStorage
	1) The 'title' property of a deck must be unique. Validate that before letting someone add a deck.
*/
export function fetchAllDecks () {
	return dispatch =>
	    API.getDecks()
			.then(decks => dispatch(getAllDecks(decks)))
}

export function insertDeck (newDeckTitle) {
	return dispatch =>
	    API.addDeck(newDeckTitle)
			.then(newDeck => dispatch(addDeck(newDeck)))
}

export function removeDeck (deckTitle) {
	return dispatch =>
	    API.removeDeck(deckTitle)
			.then(() => dispatch(deleteDeck(deckTitle)))
}

export function insertCard (card, deckTitle) {
	return dispatch =>
	    API.addCard(card, deckTitle)
			.then(newCard => dispatch(addCard(newCard, deckTitle)))
}

export function removeCard (card, deckTitle) {
	return dispatch =>
	    API.removeCard(card, deckTitle)
			.then(() => dispatch(deleteCard(card, deckTitle)))
}
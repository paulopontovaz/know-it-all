import * as API from '../util/api'

export const GET_ALL_DECKS = 'GET_ALL_DECKS'
export const ADD_DECK = 'ADD_DECK'
export const DELETE_DECK = 'DELETE_DECK'
export const ADD_CARD = 'ADD_CARD'
export const DELETE_CARD = 'DELETE_CARD'
export const GET_RESULTS = 'GET_RESULTS'
export const ADD_RESULT = 'ADD_RESULT'
export const CLEAR_ENTRIES = 'CLEAR_ResultS'

// ACTION CREATORS - START //

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
		type: DELETE_DECK,
		deckTitle,
	}
}

function addCard (newCard, deckTitle)  {
	return {
		type: ADD_CARD,
		newCard,
		deckTitle,
	}
}

function deleteCard (card, deckTitle)  {
	return {
		type: DELETE_CARD,
		card,
		deckTitle,
	}
}

function getResults (results)  {
	return {
		type: GET_RESULTS,
		results,
	}
}

function addResult (newResult)  {
	return {
		type: ADD_RESULT,
		newResult,
	}
}

function clearResults ()  {
	return {
		type: CLEAR_ENTRIES,
	}
}

// ACTION CREATORS - END //

/*
		Graças ao react-thunk, podemos acessar o dispatch para acionar os action
	creators. Cada função abaixo chama um action creator após o retorno de uma 
	promise	vinda da API criada.
*/
export function fetchAllDecks () {
	return dispatch =>
	    API.getDecks()
			.then(decks => dispatch(getAllDecks(decks)))
}

export function insertDeck (newDeckTitle) {
	return dispatch =>
	    API.addDeck(newDeckTitle)
			.then(newDeck => newDeck ? dispatch(addDeck(newDeck)) : null)
}

export function removeDeck (deckTitle) {
	return dispatch =>
	    API.removeDeck(deckTitle)
			.then(() => dispatch(deleteDeck(deckTitle)))
}

export function insertCard (card, deckTitle) {
	return dispatch =>
	    API.addCard(card, deckTitle)
			.then(newCard => newCard ? dispatch(addCard(newCard, deckTitle)) : null)
}

export function removeCard (card, deckTitle) {
	return dispatch =>
	    API.removeCard(card, deckTitle)
			.then(() => dispatch(deleteCard(card, deckTitle)))
}

export function fetchResults () {
	return dispatch =>
	    API.getResults()
			.then(results => dispatch(getResults(results)))
}

export function insertResult (newResult) {
	return dispatch =>
	    API.addResult(newResult)
			.then(insertedResult => dispatch(addResult(insertedResult)))
}

export function removeAllResults () {
	return dispatch =>
	    API.clearResults()
			.then(() => dispatch(clearResults()))
}
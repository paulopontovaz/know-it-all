import * as API from '../util/api'
import {
	GET_ALL_DECKS,
	ADD_DECK,
	DELETE_DECK,
} from './types'

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
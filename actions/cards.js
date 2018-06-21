import * as API from '../util/api'
import {
	ADD_CARD,
	DELETE_CARD,
} from './types'

// ACTION CREATORS - START //
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
// ACTION CREATORS - END //

/*
		Graças ao react-thunk, podemos acessar o dispatch para acionar os action
	creators. Cada função abaixo chama um action creator após o retorno de uma 
	promise	vinda da API criada.
*/
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
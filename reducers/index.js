import { GET_ALL_DECKS, ADD_DECK, DELETE_DECK, GET_CARDS, ADD_CARD, DELETE_CARD } from '../actions'
import { combineReducers } from 'redux'

function decks (state = {}, action) {
	switch (action.type) {
		case GET_ALL_DECKS:
			return action.decks
		case ADD_DECK:
			return {
				...state,
				[action.deck.title]: action.deck
			}
		case DELETE_DECK:
			return state.filter(deck => deck.title == action.deckTitle)
		default:
			return state
	}
}

function cards (state = [], action) {
	switch (action.type) {
		case GET_CARDS:
			return action.cards
		case ADD_CARD:
			return [...state, action.card]
		default:
			return state
	}
}

export default combineReducers({
	decks,
	cards
})
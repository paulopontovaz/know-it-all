import { GET_ALL_DECKS, ADD_DECK, GET_CARDS, ADD_CARD } from '../actions'
import { combineReducers } from 'redux'
import { convertStringToPropName } from '../util/helpers'

function decks (state = {}, action) {
	switch (action.type) {
		case GET_ALL_DECKS:
			return action.decks
		case ADD_DECK:
			newState = state.slice()
			newState[convertStringToPropName(deck.title)] = deck
			return newState
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
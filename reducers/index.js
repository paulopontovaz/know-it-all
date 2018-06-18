import { combineReducers } from 'redux'
import { 
	GET_ALL_DECKS, 
	ADD_DECK, 
	DELETE_DECK, 
	ADD_CARD, 
	DELETE_CARD,
	GET_RESULTS,
	ADD_RESULT,
	CLEAR_ENTRIES,
} from '../actions'

function decks (state = {}, action) {
	switch (action.type) {
		case GET_ALL_DECKS:
			return action.decks
		case ADD_DECK:
			return {
				...state,
				[action.newDeck.title]: action.newDeck,
			}
		case DELETE_DECK:
			let newState = Object.assign({}, state)
			delete newState[action.deckTitle]
			return newState
		case ADD_CARD:
			// state[action.deckTitle].questions = state[action.deckTitle].questions
			// 	.concat(action.newCard)
			// return state

			return {
				...state,
				[action.deckTitle]: {
					...state[action.deckTitle],
					questions: [...state[action.deckTitle].questions, action.newCard],
				}
			}
		case DELETE_CARD:
			// state[action.deckTitle].questions = state[action.deckTitle].questions
			// 	.filter(card => card.question === action.newCard.questions)
			// return state

			return {
				...state,
				[action.deckTitle]: {
					...state[action.deckTitle],
					questions: state[action.deckTitle].questions
						.filter(card => card.question !== action.card.question),
				}
			} 
		default:
			return state
	}
}

function scoreBoard (state = [], action) {
	switch (action.type) {
		case GET_RESULTS:
			return action.results
		case ADD_RESULT:
			return [...state, action.newResult]
		case CLEAR_ENTRIES:
			return []
		default:
			return state
	}
}

export default combineReducers({decks, scoreBoard})
import { GET_ALL_DECKS, ADD_DECK, DELETE_DECK, ADD_CARD, DELETE_CARD } from '../actions'

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
			debugger
			let newState = Object.assign({}, state)
			delete newState[deckTitle]
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
						.filter(card => card.question === action.newCard.questions),
				}
			} 
		default:
			return state
	}
}

export default decks
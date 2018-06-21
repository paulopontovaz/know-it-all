import { 
	GET_ALL_DECKS, 
	ADD_DECK, 
	DELETE_DECK, 
	ADD_CARD, 
	DELETE_CARD 
} from '../actions/types'

/*
	Reducer que contém todos os decks e seus cards. 
	Este reducer é um objeto pois os decks estão sendo mapeados.
*/
export default function decks (state = {}, action) {
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
			/*
					Para adicionar um card, deve-se reconstruir o state modificando 
				apenas a lista de cards do deck passado como parâmetro.
			*/
			return {
				...state,
				[action.deckTitle]: {
					...state[action.deckTitle],
					questions: [...state[action.deckTitle].questions, action.newCard],
				}
			}
		case DELETE_CARD:
			/*
					Assim como no ADD_CARD, deve-se reconstruir o state modificando 
				apenas a lista de cards do deck passado como parâmetro. O card é 
				removido por filtragem.
			*/
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
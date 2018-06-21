import { 
	GET_RESULTS,
	ADD_RESULT,
	CLEAR_ENTRIES,
} from '../actions/types'

//Reducer que contém a lista de resultados cadastrados
export default function scoreBoard (state = [], action) {
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
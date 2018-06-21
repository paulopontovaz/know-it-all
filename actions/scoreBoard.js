import * as API from '../util/api'
import {
	GET_RESULTS,
	ADD_RESULT,
	CLEAR_ENTRIES,
} from './types'

// ACTION CREATORS - START //
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
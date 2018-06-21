import { combineReducers } from 'redux'
import decks from './decks'
import scoreBoard from './scoreBoard'

export default combineReducers({
	decks, 
	scoreBoard,
})
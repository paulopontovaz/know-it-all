import { AsyncStorage } from 'react-native'
import { _ } from 'lodash'
import * as moment from 'moment'
import { 
	DECK_LIST_STORAGE_KEY, 
	SCORE_BOARD_STORAGE_KEY,
	DECK_ALREADY_EXISTS_MESSAGE, 
	CARD_ALREADY_EXISTS_MESSAGE,
} from './constants'

export function getDecks () {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)
		.catch(error => console.log(error))
}

export function addDeck (newDeckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)
		.then(deckList => {
			let updatedDeckList = Object.assign({}, deckList)

			if (Object.keys(updatedDeckList).some(k => k === newDeckTitle)) {
				console.warn(DECK_ALREADY_EXISTS_MESSAGE)
				return null
			}

			const newDeck = { title: newDeckTitle, questions: [] }

			updatedDeckList[newDeckTitle] = newDeck

			AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(updatedDeckList))

			return newDeck
		})
		.catch(error => console.log(error))
}

export function removeDeck (deckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)
		.then(deckList => {
			let updatedDeckList = Object.assign({}, deckList)

			delete updatedDeckList[deckTitle]

			AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(updatedDeckList))
		})
		.catch(error => console.log(error))
}

export function getCards (deckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)
		.then(deckList => deckList[deckTitle].questions)
		.catch(error => console.log(error))
}

export function addCard (newCard, deckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)
		.then(deckList => {
			const updatedDeckList = Object.assign({}, deckList)

			if (updatedDeckList[deckTitle].questions.some(card => card.question === newCard.question)){
				console.warn(CARD_ALREADY_EXISTS_MESSAGE)
				return null
			}

			updatedDeckList[deckTitle].questions.push(newCard)

			AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(updatedDeckList))
			return newCard
		})
		.catch(error => console.log(error))
}

export function removeCard (card, deckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)
		.then(deckList => {
			const updatedDeckList = Object.assign({}, deckList)
			updatedDeckList[deckTitle].questions = updatedDeckList[deckTitle].questions
													.filter(c => c.question !== card.question)

			AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(updatedDeckList))
		})
		.catch(error => console.log(error))
}

export function getResults () {
	return AsyncStorage.getItem(SCORE_BOARD_STORAGE_KEY)
		.then(JSON.parse)
		.then(results => {
			if (_.isEmpty(results))
				results = []
			return results
		})
		.catch(error => console.log(error))
}

export function addResult (newResult) {
	return AsyncStorage.getItem(SCORE_BOARD_STORAGE_KEY)
		.then(JSON.parse)
		.then(results => {
			if (_.isEmpty(results))
				results = []

			newResult.dateTime = moment.now()
			const updatedResults = [...results.slice(), newResult]

			AsyncStorage.setItem(SCORE_BOARD_STORAGE_KEY, JSON.stringify(updatedResults))

			return newResult
		})
}

export function clearResults () {
	return AsyncStorage.setItem(SCORE_BOARD_STORAGE_KEY, JSON.stringify([]))
}
import { AsyncStorage } from 'react-native'
import { 
	DECK_LIST_STORAGE_KEY, 
	DECK_ALREADY_EXISTS_MESSAGE, 
	CARD_ALREADY_EXISTS_MESSAGE 
} from './constants'

export function getDecks () {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(deckList => {
			if(!deckList) {
				AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify({}))
				return {}
			}

			return JSON.parse(deckList)
		})
		.catch(error => console.log(error))
}

export function addDeck (newDeckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)
		.then(deckList => {
			let updatedDeckList = Object.assign({}, deckList)

			if (Object.keys(updatedDeckList).some(k => k === newDeckTitle))
				return DECK_ALREADY_EXISTS_MESSAGE

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
			updatedDeckList[deckTitle].questions.push(newCard)

			if (updatedDeckList[deckTitle].questions.some(card => card.question === newCard.question))
				return CARD_ALREADY_EXISTS_MESSAGE

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
													.filter(c => 
														c.question === card.question 
														&& c.answer === card.answer)

			AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(updatedDeckList))
		})
		.catch(error => console.log(error))
}
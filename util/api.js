/*
	API criada para manipular o AsyncStorage.
	Todas as ações do usuário que precisam de persistência passam por aqui.
*/

import { AsyncStorage } from 'react-native'
import { _ } from 'lodash'
import * as moment from 'moment'
import { 
	DECK_LIST_STORAGE_KEY, 
	SCORE_BOARD_STORAGE_KEY,
	DECK_ALREADY_EXISTS_MESSAGE, 
	CARD_ALREADY_EXISTS_MESSAGE,
} from './constants'

//Retorna da storage a lista de todos os decks
export function getDecks () {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)//Acessa a Deck List contida na storage
		.then(JSON.parse)//Converte o retorno de string para objeto JavaScript e retorna
		.catch(error => console.warn(error))//Exibe erro no console, caso ocorra
}

//Insere na storage um novo deck
export function addDeck (newDeckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)//Acessa a Deck List contida na storage
		.then(JSON.parse)//Converte o retorno de string para objeto JavaScript e retorna
		.then(deckList => {
			//Copia o objeto retornado para manipulação
			let updatedDeckList = Object.assign({}, deckList)

			//Verificando se o deck a ser inserido já existe e retornando erro em caso positivo
			if (Object.keys(updatedDeckList).some(k => k === newDeckTitle)) {
				console.warn(DECK_ALREADY_EXISTS_MESSAGE)
				return null
			}

			//O novo deck terá o título e uma lista vazia de questions como propriedade
			const newDeck = { title: newDeckTitle, questions: [] }

			//Inserido novo deck no objeto de lista de decks. Usa-se o título do deck como chave
			updatedDeckList[newDeckTitle] = newDeck

			//Atualizando objeto na storage
			AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(updatedDeckList))

			return newDeck //Retornando o novo deck
		})
		.catch(error => console.warn(error))//Exibe erro no console, caso ocorra
}

//Exclui um deck da storage
export function removeDeck (deckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)//Converte o retorno de string para objeto JavaScript e retorna
		.then(deckList => {
			//Copia o objeto retornado para manipulação
			let updatedDeckList = Object.assign({}, deckList)

			//Removendo deck da lista de decks, por exclusão de propriedade
			delete updatedDeckList[deckTitle]

			//Atualizando objeto na storage
			AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(updatedDeckList))
		})
		.catch(error => console.warn(error))//Exibe erro no console, caso ocorra
}

//Retorna da storage a lista de todos os cards de um determinado deck
export function getCards (deckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)//Converte o retorno de string para objeto JavaScript e retorna
		.then(deckList => deckList[deckTitle].questions)
		.catch(error => console.warn(error))//Exibe erro no console, caso ocorra
}

//Insere em um deck e na storage um novo card
export function addCard (newCard, deckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)//Converte o retorno de string para objeto JavaScript e retorna
		.then(deckList => {
			//Copia o objeto retornado para manipulação
			const updatedDeckList = Object.assign({}, deckList)

			//Verificando se o card a ser inserido já existe no mesmo deck e retornando erro em caso positivo
			if (updatedDeckList[deckTitle].questions.some(card => card.question === newCard.question)){
				console.warn(CARD_ALREADY_EXISTS_MESSAGE)
				return null
			}

			//Inserindo um novo card na lista de cards do deck
			updatedDeckList[deckTitle].questions.push(newCard)

			//Atualizando objeto na storage
			AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(updatedDeckList))

			return newCard //Retornando o novo card
		})
		.catch(error => console.warn(error))//Exibe erro no console, caso ocorra
}

//Exclui um card de um deck e da storage
export function removeCard (card, deckTitle) {
	return AsyncStorage.getItem(DECK_LIST_STORAGE_KEY)
		.then(JSON.parse)//Converte o retorno de string para objeto JavaScript e retorna
		.then(deckList => {
			//Copia o objeto retornado para manipulação
			const updatedDeckList = Object.assign({}, deckList)

			//Atualizando o array de questions ao remover card via filtragem
			updatedDeckList[deckTitle].questions = updatedDeckList[deckTitle].questions
													.filter(c => c.question !== card.question)

			//Atualizando objeto na storage
			AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(updatedDeckList))
		})
		.catch(error => console.warn(error))//Exibe erro no console, caso ocorra
}

//Retorna a lista de resultados a serem exibidos na view Score Board
export function getResults () {
	return AsyncStorage.getItem(SCORE_BOARD_STORAGE_KEY)
		.then(JSON.parse)//Converte o retorno de string para objeto JavaScript e retorna
		.then(results => {
			if (_.isEmpty(results))
				results = []
			return results
		})
		.catch(error => console.warn(error))//Exibe erro no console, caso ocorra.
}

//Insere um resultado na lista do Score Board
export function addResult (newResult) {
	return AsyncStorage.getItem(SCORE_BOARD_STORAGE_KEY)
		.then(JSON.parse)//Converte o retorno de string para objeto JavaScript e retorna
		.then(results => {
			if (_.isEmpty(results))//Se o resultado vier como objeto vazio, muda seu valor para array vazio
				results = []

			//Adicionando propriedade para salvar o momento em que o resultado foi salvo
			newResult.dateTime = moment.now()

			//Inserindo o resultado na lista
			const updatedResults = [...results.slice(), newResult]

			//Atualizando objeto na storage
			AsyncStorage.setItem(SCORE_BOARD_STORAGE_KEY, JSON.stringify(updatedResults))

			return newResult
		})
		.catch(error => console.warn(error))//Exibe erro no console, caso ocorra
}

//Exclui todos os resultados da lista do Score Board
export function clearResults () {
	//Atualizando objeto na storage, enviando um array vazio
	return AsyncStorage.setItem(SCORE_BOARD_STORAGE_KEY, JSON.stringify([]))
}
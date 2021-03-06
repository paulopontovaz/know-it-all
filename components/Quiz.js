import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _ } from 'lodash'
import { ScrollView, View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
import * as Colors from '../util/colors'
import { insertResult } from '../actions/scoreBoard'
import { scheduleNotification } from '../util/helpers'

/*
	Componente para a página do Quiz, acionada a partir da página DeckDetails.
*/
class Quiz extends Component {
	state = { 
		playerName: '', //Inicializa o nome do jogador como string vazia
		currentCard: 0, //Índice do card atual na lista de cards do deck
		ready: false, //Indica se já se pode iniciar o Quiz, após o preenchimento do 'playerName'
		score: 0, //Inicializa o 'score' (pontuação) com zero
		showAnswer: false, //Sinaliza se a resposta da pergunta deve ser exibida
		done: false, //Indica se todas as questões já foram respondidas
	}

	/*
		O Quiz se inicia quando o nome do jogador foi preenchido e 
		o jogador tocou no botão que aciona esta função. Aqui o state
		é reiniciado, exceto pela propriedade 'playerName', para conveniência,
		caso o jogador queira jogar novamente, sem precisar reescrever seu nome.
	*/
	iniciarQuiz (playerName) {
		if (playerName)
			this.setState({
				currentCard: 0, 
				score: 0, 
				ready: true, 
				done: false, 
				showAnswer: false,
			})
	}

	/*
		rightAnswer: indica se a resposta estava certa ou errada.
	*/
	answerQuestion (rightAnswer) {
		const numberOfCards = this.props.navigation.state.params.cards.length

		this.setState(({score, currentCard, playerName}) => {
			//Verifica se o card atual é o último
			const done = numberOfCards - 1 === this.state.currentCard
			/*
				Se a resposta estava correta, então o jogador recebe um ponto, 
				mas se errar a pontuação não diminui. Permanece a mesma.
			*/
			score = rightAnswer ? score + 1 : score

			if (done){ //Se o card atual for o último, salva-se a pontuação para exibir na Score Board.
				const { deckTitle } = this.props.navigation.state.params
				this.props.saveResult({playerName, score, deckTitle})
				//Reinicia a notificação para que seja disparada somente no dia seguinte.	
				scheduleNotification()
			}

			return {
				score,
				done,
				currentCard: currentCard + 1, //Muda para o índice do próximo card.
				showAnswer: false, //Esconde a resposta antes de ir para o próximo card.
			}
		})		
	}

	render () {
		const { playerName, currentCard, ready, score, showAnswer, done } = this.state
		const { cards } = this.props.navigation.state.params

		if (!ready)
			return (
				<View style={styles.container}>
					<TextInput
						style={styles.playerNameInput}
						placeholder="Enter the player name"
						onChangeText={playerName => this.setState({playerName})}
						value={playerName} />
					<TextButton 
						style={{marginTop: 20}}
						onPress={() => this.iniciarQuiz(playerName)}>
						Start!
					</TextButton>
				</View>
			)

		if (done) 
			return (
				<View style={[styles.container, {justifyContent: 'space-around'}]}>
					<View style={{alignItems: 'center'}}>
						<Text style={styles.scoreText}>Congratulations on finishing the quiz!</Text>
						<Text style={styles.scoreText}>{`Your score was`}</Text>
						<Text style={styles.score}>{score}</Text>
					</View>
					
					<View>
						<TextButton onPress={() => this.props.navigation.goBack()}>
							Go Back
						</TextButton>

						<TextButton 
							style={{marginTop: 20}}
							onPress={() => this.setState({ready: false, done: false})}>
							Try Again
						</TextButton>
					</View>					
				</View>				
			)

		return (
			<View style={styles.container}>
				<View style={styles.header}>
					<Text>{`Player: ${playerName}`}</Text>
					<Text>{`Card ${currentCard + 1} of ${cards.length}`}</Text>
				</View>

				<View style={styles.cardContent}>
					<Text style={styles.question}>{cards[currentCard].question}</Text>

					{showAnswer && 
						<Text style={styles.answer}>
							{cards[currentCard].answer}
						</Text>}

					{!showAnswer && 
						<TextButton 
							style={[styles.textButton, {marginTop: 20}]}
							onPress={() => this.setState({showAnswer: true})}>
							Show Answer
						</TextButton>}
				</View>

				<View style={{alignItems: 'center', marginTop: 30}}>
					<TextButton 
						style={styles.textButton}
						disabled={!showAnswer}
						color={Colors.rightAnswer}
						onPress={() => this.answerQuestion(true)}>
							Correct :D
					</TextButton>

					<TextButton 
						style={[styles.textButton, {marginTop: 20}]}
						disabled={!showAnswer}
						color={Colors.wrongAnswer}
						onPress={() => this.answerQuestion(false)}>
							Wrong :(
					</TextButton>
				</View>				
					
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		padding: 10,
	},
	question: {
		fontSize: 32,
	},
	answer: {
		fontSize: 28, 
		color: Colors.secondaryFont, 
		marginTop: 20,
	},
	score: {
		fontSize: 72, 
		fontWeight: 'bold',
		marginTop: 20,
	},
	scoreText: {
		fontSize: 18,
	},
	textButton: {
		width: 150,
	},
	header: {
		flexDirection: 'row', 
		justifyContent: 'space-between',
	},
	cardContent: {
		alignItems: 'center', 
		marginTop: 20, 
		borderWidth: 1, 
		borderColor: Colors.secondaryFont,
		padding: 20,
	},
	playerNameInput: {
		padding: 10, 
		fontSize: 20,
	},
})

function mapDispatchToProps (dispatch) {
	return {
		//Função para salvar os resultados dos Quizes no histórico.
		saveResult: newResult => dispatch(insertResult(newResult))
	}
}

export default connect(null, mapDispatchToProps)(Quiz)
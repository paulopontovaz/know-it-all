import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _ } from 'lodash'
import { ScrollView, View, TouchableOpacity, Text, TextInput, StyleSheet } from 'react-native'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
import * as Colors from '../util/colors'
import { insertResult } from '../actions'

class Quiz extends Component {
	state = { 
		playerName: '',
		currentCard: 0,
		ready: false,
		score: 0,
		showAnswer: false,
		done: false,
	}

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

	answerQuestion (rightAnswer, cards) {
		this.setState(({score, currentCard, playerName}) => {
			const done = cards.length - 1 === this.state.currentCard
			score = rightAnswer ? score + 1 : score

			if (done) 
				this.props.saveResult({playerName, score})

			return {
				score,
				done,
				currentCard: currentCard + 1,
				showAnswer: false,	
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
						onPress={() => this.answerQuestion(true, cards)}>
							Correct :D
					</TextButton>

					<TextButton 
						style={[styles.textButton, {marginTop: 20}]}
						disabled={!showAnswer}
						color={Colors.wrongAnswer}
						onPress={() => this.answerQuestion(false, cards)}>
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
		saveResult: newResult => dispatch(insertResult(newResult))
	}
}

export default connect(null, mapDispatchToProps)(Quiz)
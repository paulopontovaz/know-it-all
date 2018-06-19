import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _ } from 'lodash'
import {
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	Switch,
	StyleSheet,
	TextInput
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button'
import { AppLoading } from 'expo'
import CardItem from './CardItem'
import TextButton from './TextButton'
import { fetchCards } from '../actions'
import * as Colors from '../util/colors'

/*
	Componente que exibe dados do deck selecionado e sua lista de cards.
	É a partir dessa página que se pode iniciar o Quiz.
*/
class DeckDetails extends Component {
	state = { showAnswers: false }

	startQuiz() {
		const { cards } = this.props
		const { deckTitle } = this.props.navigation.state.params
		if(!_.isEmpty(cards)) //Se há cards na lista, vai-se para a página do Quiz.
			this.props.navigation.navigate('Quiz', { cards, deckTitle })
	}

	render () {
		const { showAnswers } = this.state
		const { cards } = this.props
		const { deckTitle } = this.props.navigation.state.params

		return (
			<View style={styles.container}>
				<View>
					<View style={styles.header}>
						<Text style={styles.deckTitle}>{deckTitle}</Text>
						<TextButton 
							onPress={() => this.startQuiz()}
							disabled={_.isEmpty(cards)}>
								Start Quiz!
						</TextButton>
					</View>					
					<View style={styles.showAnswers}>
						<Text style={styles.showAnswersText}>Show answers</Text>
						<Switch 
							value={showAnswers} 
							onValueChange={value => this.setState({showAnswers: value})} />
					</View>					
				</View>

				{cards && cards.length > 0 && (
					<ScrollView style={styles.scrollViewContainer}>
						{cards.map((card, index) => (
							<CardItem key={index} card={card} deckTitle={deckTitle} showAnswer={showAnswers} />
						))}
					</ScrollView>
				)}

				{(!cards || cards.length === 0) && (
					<View style={styles.messageBox}>
						<Text style={styles.messageTitle}>{`This deck has no questions.`}</Text>
						<Text style={styles.messageText}>
							{`Why don't you add one by pressing the round button below?`}
						</Text>
					</View>
				)}								

				<ActionButton 
					title="New Card" 
					degrees={0}
					position="right"
					buttonColor={Colors.mainFont}
					onPress={() => this.props.navigation.navigate('AddCard', { deckTitle: deckTitle })}>
						<MaterialCommunityIcons name="plus" />
				</ActionButton>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		padding: 10,
		backgroundColor: Colors.mainBackground,
	},
	scrollViewContainer: {
		flex: 1, 
		marginTop: 20,
	},
	deckTitle: {
		margin: 10,
		color: Colors.mainFont,
		fontSize: 28,
		fontWeight: 'bold',
	},
	header: {
		flexDirection: 'row', 
		justifyContent: 'space-between', 
		alignItems: 'center',
	},
	showAnswers: {
		flexDirection: 'row', 
		justifyContent: 'flex-end', 
		alignItems: 'center', 
		marginTop: 30,
	},
	showAnswersText: {
		marginRight: 5,
		color: Colors.mainFont,
	},
	messageBox: {
		flex: 1,
		justifyContent: 'flex-start',
		alignItems: 'center',
		padding: 10,
	},	
	messageTitle: {
		fontWeight: 'bold',
		fontSize: 20,
		marginTop: 20,
		alignItems: 'center',
		color: Colors.mainFont,
	},
	messageText: {
		marginTop: 20,
		alignItems: 'center',
		color: Colors.mainFont,
	},
})

const mapStateToProps = ({ decks }, ownProps) => {
	/*
		Obtém-se o título do deck a partir das propriedades do
		'navigation' e consegue-se acessar os cards do deck correto.
	*/
	const { deckTitle } = ownProps.navigation.state.params
	return {
		cards: decks[deckTitle].questions
	}
}

export default connect(mapStateToProps)(DeckDetails)

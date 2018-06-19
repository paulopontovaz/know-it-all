import React, { Component } from 'react'
import { connect } from 'react-redux'
import {
	View,
	TouchableOpacity,
	Text,
	StyleSheet,
	TextInput
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import TextButton from './TextButton'
import { insertCard } from '../actions'

//Componente criado para inserção de um card na lista de cards de um deck.
class AddCard extends Component {
	state = {
		question: '',
		answer: '',
	}

	insertCard (card) {
		const { deckTitle } = this.props.navigation.state.params

		if (card && card.question && card.answer && deckTitle) {
			this.props.addCard(card, deckTitle)
			//Após adicionar o novo card, volta-se para a página anterior.
			this.props.navigation.goBack()
		}
	}

	render () {
		const { deckTitle } = this.props.navigation.state.params
		const { question, answer } = this.state

		return (
			<View style={styles.container}>
				<Text style={styles.header}>{`Add a card to '${deckTitle}'`}</Text>
				<TextInput
					style={styles.textInput}
					placeholder="Question"
					onChangeText={question => this.setState({question})}
					value={question}
				/>
				<TextInput
					style={styles.textInput}
					placeholder="Answer"
					onChangeText={answer => this.setState({answer})}
					value={answer}
				/>
				<TextButton 
					style={{marginTop: 10}}
					onPress={() => this.insertCard({question, answer})}>
						ADD CARD
				</TextButton>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		padding: 10,
	},
	header: {
		padding: 10,
		alignItems: 'center',
	},
	textInput: {
		marginTop: 10,
		padding: 10,
	},
})

const mapDispatchToProps = dispatch => ({
	addCard: (card, deckTitle) => dispatch(insertCard(card, deckTitle))
})

export default connect(null, mapDispatchToProps)(AddCard)

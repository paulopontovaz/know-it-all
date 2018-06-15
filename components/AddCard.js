import React, { Component } from 'react'
import {
	View,
	TouchableOpacity,
	Text,
	// Platform,
	// StyleSheet,
	TextInput
} from 'react-native'
import { NavigationActions } from 'react-navigation'
import { connect } from 'react-redux'
import { insertCard } from '../actions'

class AddCard extends Component {
	state = {
		question: '',
		answer: '',
	}

	insertCard (card) {
		const { deckTitle } = this.props.navigation.state.params

		if (card && card.question && card.answer && deckTitle)
			this.props.addCard(card, deckTitle)
				.then(() => this.props.navigation.goBack())
	}

	render () {
		const { question, answer } = this.state

		return (
			<View>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					placeholder="Question"
					onChangeText={question => this.setState({question})}
					value={question}
				/>
				<TextInput
					style={{height: 40, borderColor: 'gray', borderWidth: 1}}
					placeholder="Answer"
					onChangeText={answer => this.setState({answer})}
					value={answer}
				/>
				<TouchableOpacity onPress={() => this.insertCard({question, answer})}>
					<Text>Add Card</Text>
				</TouchableOpacity>
			</View>
		)
	}
}

// const styles = StyleSheet.create({
// })

const mapDispatchToProps = dispatch => ({
	addCard: (card, deckTitle) => dispatch(insertCard(card, deckTitle))
})

export default connect(null, mapDispatchToProps)(AddCard)

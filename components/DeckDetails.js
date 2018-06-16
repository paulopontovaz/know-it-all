import React, { Component } from 'react'
import {
	ScrollView,
	View,
	TouchableOpacity,
	Text,
	Switch,
	// Platform,
	StyleSheet,
	TextInput
} from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import ActionButton from 'react-native-action-button'
import { connect } from 'react-redux'
import { AppLoading } from 'expo'
import CardItem from './CardItem'
import { fetchCards } from '../actions'

class DeckDetails extends Component {
	state = { showAnswers: false }

	render () {
		const { showAnswers } = this.state
		const { cards } = this.props
		const { deckTitle } = this.props.navigation.state.params

		return (
			<View style={{flex: 1}}>
				<View>
					<Text style={styles.deckTitle}>{deckTitle}</Text>
					<TouchableOpacity>
						<Text>{"START QUIZ!"}</Text>				
					</TouchableOpacity>
					<View>
						<Text>{'Show answers'}</Text>
						<Switch 
							value={showAnswers} 
							onValueChange={value => this.setState({showAnswers: value})} />
					</View>					
				</View>				

				{cards && cards.length > 0 && (
					<ScrollView style={{flex: 1}}>
						{cards.map((card, index) => (
							<CardItem key={index} card={card} deckTitle={deckTitle} showAnswer={showAnswers} />
						))}
					</ScrollView>
				)}

				{(!cards || cards.length === 0) && (
					<View style={{flex: 1}}>
						<Text>{`This deck, ${deckTitle}, has no questions.`}</Text>
						<Text>{`Why don't you add one by pressing the round button below?`}</Text>
					</View>
				)}								

				<ActionButton 
					title="New Card" 
					degrees={0}
					position="right"
					onPress={() => this.props.navigation.navigate('AddCard', { deckTitle: deckTitle })}>
						<MaterialCommunityIcons name="plus" />
				</ActionButton>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	deckTitle: {
		margin: 10,
		color: 'black',
		fontSize: 28,
		fontWeight: 'bold',
	},
})

const mapStateToProps = (decks, ownProps) => {
	const { deckTitle } = ownProps.navigation.state.params
	return {
		cards: decks[deckTitle].questions
	}
}

export default connect(mapStateToProps)(DeckDetails)

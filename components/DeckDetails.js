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
	state = {
		ready: false,
		showAnswers: false,
		cards: [],
	}

	componentDidMount () {
		const { deck } = this.props.navigation.state.params
		this.props.getCards(deck.title)
			.then(cards => this.setState({ ready: true }))
	}

	render () {
		const { ready, showAnswers } = this.state
		const { cards } = this.props
		const { deck } = this.props.navigation.state.params

		if (!ready)
			return (<AppLoading />)

		return (
			<View style={{flex: 1}}>
				<View>
					<Text style={styles.deckTitle}>{deck.title}</Text>
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

				<ScrollView style={{flex: 1}}>
					{cards && cards.map((card, index) => (
						<CardItem key={index} card={card} deckTitle={deck.title} showAnswer={showAnswers} />
					))}
				</ScrollView>				

				<ActionButton 
					title="New Card" 
					degrees={0}
					position="right"
					onPress={() => this.props.navigation.navigate('AddCard', { deckTitle: deck.title })}>
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

const mapStateToProps = ({cards}) => ({cards})

const mapDispatchToProps = dispatch => ({
	getCards: deckTitle => dispatch(fetchCards(deckTitle))
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckDetails)

import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _ } from 'lodash'
import { ScrollView, View, TouchableOpacity, Text, Platform, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import { AppLoading } from 'expo'
import ActionButton from 'react-native-action-button'
import DeckItem from './DeckItem'
import { fetchAllDecks } from '../actions'

class DeckList extends Component {
	state = { ready: false }

	componentDidMount () {
		this.props.getDecks().then(() => this.setState({ ready: true }))
	}

	render () {
		const { ready } = this.state
		const { decks } = this.props

		if (!ready)
			return (<AppLoading />)

		return (
			<View style={{flex: 1}}>
				{_.isEmpty(decks) && (
					<View style={{flex: 1, justifyContent: 'flex-start', backgroundColor: '#000000'}}>
						<Text>{`There are no decks created. `}</Text>
						<Text>{`Why don't you create one by pressing the round button below?`}</Text>
					</View>
				)}
				
				{decks && (
					<ScrollView style={{flex: 1}}>
						{Object.keys(decks).map(deckKey => (
							<DeckItem 
								style={{backgroundColor: 'white'}}
								deck={decks[deckKey]} 
								key={deckKey} 
								onSelect={() => this.props.navigation.navigate(
									'DeckDetails', { deckTitle: decks[deckKey].title }
								)}
							/>
						))}
					</ScrollView>
				)}				

				<ActionButton 
					title="New Deck" 
					degrees={0}
					position="right"
					onPress={() => this.props.navigation.navigate('AddDeck')}>
						<MaterialCommunityIcons name="plus" />
				</ActionButton>
			</View>
		)
	}
}

const mapStateToProps = (decks) => ({decks})

const mapDispatchToProps = dispatch => ({
	getDecks: () => dispatch(fetchAllDecks())
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
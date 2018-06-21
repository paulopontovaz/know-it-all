import React, { Component } from 'react'
import { connect } from 'react-redux'
import { _ } from 'lodash'
import { ScrollView, View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons, Ionicons } from '@expo/vector-icons'
import { NavigationActions } from 'react-navigation'
import { AppLoading } from 'expo'
import ActionButton from 'react-native-action-button'
import DeckItem from './DeckItem'
import { fetchAllDecks } from '../actions/decks'
import * as Colors from '../util/colors'


/*
	Componente para exibir o map de decks.
*/
class DeckList extends Component {
	state = { ready: false }

	componentDidMount () {
		//Após obter todos os decks a partir da API, marca o state como 'ready'.
		this.props.getDecks().then(() => this.setState({ ready: true }))
	}

	render () {
		const { ready } = this.state
		const { decks } = this.props

		if (!ready)
			return (<AppLoading />)

		return (
			<View style={styles.container}>
				{_.isEmpty(decks) && (
					<View style={styles.messageBox}>
						<Text style={styles.messageTitle}>
							{`There are no decks created. `}
						</Text>
						<Text style={styles.messageText}>
							{`Why don't you create one by pressing the round button below?`}
						</Text>
					</View>
				)}
				
				{decks && (
					<ScrollView style={{flex: 1}}>
						{Object.keys(decks).map(deckKey => (
							<DeckItem 
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
					buttonColor={Colors.mainFont}
					onPress={() => this.props.navigation.navigate('AddDeck')}>
						<MaterialCommunityIcons name="plus" />
				</ActionButton>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1, 
		backgroundColor: Colors.mainBackground,
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
	},
	messageText: {
		marginTop: 20,
		alignItems: 'center',
	},
})

const mapStateToProps = ({decks}) => ({decks})

const mapDispatchToProps = dispatch => ({
	getDecks: () => dispatch(fetchAllDecks()) //Função para obter o objeto de decks.
})

export default connect(mapStateToProps, mapDispatchToProps)(DeckList)
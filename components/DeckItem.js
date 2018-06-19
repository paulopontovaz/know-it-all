import React from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, StyleSheet, Alert } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'
import { removeDeck } from '../actions'
import * as Colors from '../util/colors'

/*
	Componente criado para representar um item da lista de decks.
*/
function DeckItem ({deck, onSelect, deleteDeck}) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onSelect} style={styles.content}>
				<Text style={styles.deckTitle}>{deck.title}</Text>
				<Text style={styles.cardCount}>{'Card Count: ' + deck.questions.length}</Text>
			</TouchableOpacity>
			<TouchableOpacity 
				style={styles.content} 
				onPress={() => confirmDelete(deck.title, deleteDeck)}>
				<MaterialCommunityIcons name="delete" size={25} color={Colors.mainFont} />
			</TouchableOpacity>
		</View>
	)
}

//Exibe uma dialog de confirmação para a exclusão do deck, usando o 'Alert'.
function confirmDelete (deckTitle, deleteFunction) {
	Alert.alert(
		'Confirm Delete',
		'Are you sure you want to delete this deck?',
		[
			{text: 'Cancel'},
			{text: 'Yes', onPress: () => deleteFunction(deckTitle)}
		],
		{cancelable: false}
	)
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',		
		margin: 10,
		backgroundColor: Colors.listItemBackground,
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 6,
		shadowOpacity: 1,
	},
	content: {
		height: '100%',
		padding: 10,
	},
	deckTitle: {
		fontSize: 18,
		fontWeight: 'bold',
		color: Colors.mainFont,
	},
	cardCount: {
		fontSize: 15,
		color: Colors.secondaryFont,
	},
})

function mapDispatchToProps (dispatch)  {
	return {
		deleteDeck: deckTitle => dispatch(removeDeck(deckTitle))
	}
}

export default connect(null, mapDispatchToProps)(DeckItem)
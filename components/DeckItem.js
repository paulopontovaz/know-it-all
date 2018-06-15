import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { MaterialCommunityIcons } from '@expo/vector-icons'

export default function DeckItem ({deck, onSelect}) {
	return (
		<View style={styles.container}>
			<TouchableOpacity onPress={onSelect} style={styles.content}>
				<Text style={styles.deckTitle}>{deck.title}</Text>
				<Text style={styles.cardCount}>{'Card Count: ' + deck.questions.length}</Text>
			</TouchableOpacity>
			<TouchableOpacity style={styles.content}>
				<MaterialCommunityIcons name="delete" size={25} />
			</TouchableOpacity>
		</View>
	)
}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: 'row',
		justifyContent: 'space-between',
		padding: 10,
		margin: 10,
		backgroundColor: '#ffffff',
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3
		},
		shadowRadius: 6,
		shadowOpacity: 1,
	},
	content: {
		height: '100%'
	},
	deckTitle: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	cardCount: {
		fontSize: 15,
		color: '#cccccc',
	},
})
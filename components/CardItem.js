import React from 'react'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons'

export default function CardItem ({card, deckTitle, showAnswer}) {
	return (
		<View style={styles.container}>
			<TouchableOpacity style={{flexDirection: 'row', alignItems: 'center'}}>
				<EvilIcons name="question" size={30}/>
				<View style={styles.content}>
					<Text style={styles.question}>{card.question}</Text>
					{showAnswer && <Text style={styles.answer}>{'Answer: ' + card.answer}</Text>}					
				</View>				
			</TouchableOpacity>
			<TouchableOpacity style={styles.actions}>
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
		paddingTop: 10,
		paddingRight: 10,
		paddingBottom: 10,
		paddingLeft: 0,
		margin: 10,
		backgroundColor: '#ffffff',
		shadowColor: 'rgba(0, 0, 0, 0.24)',
		shadowOffset: {
			width: 0,
			height: 3,
		},
		shadowRadius: 6,
		shadowOpacity: 1,
	},
	// content: {
		
	// },
	question: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	answer: {
		fontSize: 15,
		color: '#cccccc',
	},
	// actions: {
		
	// },
})
import React, { Component } from 'react'
import { connect } from 'react-redux'
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { EvilIcons, MaterialCommunityIcons } from '@expo/vector-icons'
import { removeCard } from '../actions'

function CardItem ({card, deckTitle, showAnswer, deleteCard}) {
	return (
		<View style={styles.allContainer}>
			<View style={styles.container}>
				<TouchableOpacity style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
					<EvilIcons style={{alignSelf: 'center'}} name="question" size={30}/>
					<View style={styles.questionContent}>
						<Text style={styles.question}>{card.question}</Text>
					</View>				
				</TouchableOpacity>
				<TouchableOpacity style={styles.actions} onPress={() => deleteCard(card, deckTitle)}>
					<MaterialCommunityIcons name="delete" size={25} />
				</TouchableOpacity>
			</View>			
			{showAnswer && <Text style={styles.answer}>{'Answer: ' + card.answer}</Text>}					
		</View>
	)
}

const styles = StyleSheet.create({
	allContainer: {
		flex: 1,
		flexDirection: 'column',
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
	container: {
		flexDirection: 'row',
		justifyContent: 'space-between',
	},
	questionContent: {
		marginLeft: 10,
		alignSelf: 'flex-start',
	},
	question: {
		fontSize: 18,
		fontWeight: 'bold',
	},
	answer: {
		marginLeft: 10,
		marginTop: 10,
		fontSize: 15,
		color: '#cccccc',
	},
})

function mapDispatchToProps (dispatch)  {
	return {
		deleteCard: (card, deckTitle) => dispatch(removeCard(card, deckTitle))
	}
}

export default connect(null, mapDispatchToProps)(CardItem)